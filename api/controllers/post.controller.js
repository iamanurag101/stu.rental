import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";
import { getOrSetCache } from "../utils/cache.js";
import redisClient from "../lib/redis.js";

const logExecutionTime = (startTime, status, resource) => {
  const endTime = process.hrtime(startTime);
  const durationInMs = (endTime[0] * 1000 + endTime[1] / 1e6).toFixed(2);

  console.log("\n-----------------------------------------");
  console.log(`Resource Requested: ${resource}`);
  console.log(`Request initiated at: ${new Date().toLocaleTimeString('en-IN', { hour12: false })}`);
  console.log(`Cache Status:         ${status}`);
  console.log(`Response generated in:  ${durationInMs} ms`);
  console.log("-----------------------------------------");
};

export const getPosts = async (req, res) => {

  const startTime = process.hrtime();

  const query = req.query;
  // creating a unique cache key based on the query parameters
  const cacheKey = `posts:all:${JSON.stringify(query)}`;

  try {
    const posts = await getOrSetCache(cacheKey, async () => {
      // this function only runs on a CACHE MISS
      return prisma.post.findMany({
        where: {
          city: query.city || undefined,
          type: query.type || undefined,
          property: query.property || undefined,
          bedroom: parseInt(query.bedroom) || undefined,
          price: {
            gte: parseInt(query.minPrice) || undefined,
            lte: parseInt(query.maxPrice) || undefined,
          },
        },
      });
    }, (status) => {
      logExecutionTime(startTime, status, "All Posts");
    });
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get posts" });
  }
};

export const getPost = async (req, res) => {
  const id = req.params.id;
  const cacheKey = `post:${id}`;

  try {
    const post = await getOrSetCache(cacheKey, async () => {
      // this function only runs on a CACHE MISS
      return prisma.post.findUnique({
        where: { id },
        include: {
          postDetail: true,
          user: {
            select: {
              username: true,
              avatar: true,
              email: true,
            },
          },
        },
      });
    });

    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }

    // the logic to check if a post is saved by the user is dynamic and should not be cached.
    // we fetch it every time.
    const token = req.cookies?.token;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (!err) {
          const saved = await prisma.savedPost.findUnique({
            where: {
              userId_postId: {
                postId: id,
                userId: payload.id,
              },
            },
          });
          return res.status(200).json({ ...post, isSaved: !!saved }); // !!saved = conversion from value to boolean, !saved = flip to opposite boolean, !!saved = reflip opposite one for real one
        }
        // if token verification fails, proceed but mark as not saved
        return res.status(200).json({ ...post, isSaved: false });
      });
    } else {
      // no tokens, so not saved fosure
      return res.status(200).json({ ...post, isSaved: false });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get post" });
  }
};


export const addPost = async (req, res) => {
  const body = req.body;
  const tokenUserId = req.userId;

  try {
    const newPost = await prisma.post.create({
      data: {
        ...body.postData,
        userId: tokenUserId,
        postDetail: {
          create: body.postDetail,
        },
      },
    });

    // invalidate the general list of all posts, as it has changed.
    const allPostsKeys = await redisClient.keys('posts:all:*');
    if (allPostsKeys.length > 0) {
        await redisClient.del(allPostsKeys);
        console.log("CACHE INVALIDATED for all posts list.");
    }

    // invalidate the cache for the user's own profile posts.
    const profilePostsCacheKey = `user:${tokenUserId}:profilePosts`;
    await redisClient.del(profilePostsCacheKey);
    console.log(`CACHE INVALIDATED for key: ${profilePostsCacheKey}`);

    res.status(200).json(newPost);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create post" });
  }
};

export const updatePost = async (req, res) => {
    const postId = req.params.id;
    const body = req.body;
    const tokenUserId = req.userId;

    try {
        const postToUpdate = await prisma.post.findUnique({ where: { id: postId } });
        if (postToUpdate.userId !== tokenUserId) {
            return res.status(403).json({ message: "Not Authorized!" });
        }

        await prisma.post.update({
            where: { id: postId },
            data: {
                ...body.postData,
                postDetail: {
                    update: body.postDetail,
                },
            },
        });


        // invalidate the specific post's cache.
        const postCacheKey = `post:${postId}`;
        await redisClient.del(postCacheKey);
        console.log(`CACHE INVALIDATED for key: ${postCacheKey}`);

        // invalidate the general posts list cache.
        const allPostsKeys = await redisClient.keys('posts:all:*');
        if (allPostsKeys.length > 0) {
            await redisClient.del(allPostsKeys);
            console.log("CACHE INVALIDATED for all posts list.");
        }

        // invalidate the user's profile posts cache.
        const profilePostsCacheKey = `user:${tokenUserId}:profilePosts`;
        await redisClient.del(profilePostsCacheKey);
        console.log(`CACHE INVALIDATED for key: ${profilePostsCacheKey}`);
        
        res.status(200).json({ message: "Post updated successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to update post" });
    }
};



export const deletePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  try {
    const post = await prisma.post.findUnique({ where: { id } });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.userId !== tokenUserId) {
      return res.status(403).json({ message: "Not Authorized!" });
    }

    await prisma.savedPost.deleteMany({ where: { postId: id } });
    await prisma.postDetail.delete({ where: { postId: id } });
    await prisma.post.delete({ where: { id } });

    // invalidate the cache for the specific post that was deleted
    const postCacheKey = `post:${id}`;
    await redisClient.del(postCacheKey);
    console.log(`CACHE INVALIDATED for key: ${postCacheKey}`);
    
    // invalidate the cache for the general list of all posts
    const allPostsKeys = await redisClient.keys('posts:all:*');
    if (allPostsKeys.length > 0) {
        await redisClient.del(allPostsKeys);
        console.log("CACHE INVALIDATED for all posts list.");
    }

    // invalidate the cache for the user's profile posts
    const profilePostsCacheKey = `user:${tokenUserId}:profilePosts`;
    await redisClient.del(profilePostsCacheKey);
    console.log(`CACHE INVALIDATED for key: ${profilePostsCacheKey}`);

    res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete post" });
  }
};


