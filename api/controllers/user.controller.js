import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";
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

export const getUsers = async (req, res) => {
  const cacheKey = "users:all";
  try {
    const users = await getOrSetCache(cacheKey, async () => {
      return prisma.user.findMany();
    });
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get users!" });
  }
};

export const getUser = async (req, res) => {
  const id = req.params.id;
  const cacheKey = `user:${id}`;
  try {
    const user = await getOrSetCache(cacheKey, async () => {
      return prisma.user.findUnique({
        where: { id },
      });
    });

    if (!user) {
        return res.status(404).json({ message: "User not found!" });
    }
    
    const { password: userPassword, ...userInfo } = user;
    res.status(200).json(userInfo);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get user!" });
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  const { password, avatar, ...inputs } = req.body;

  if (id !== tokenUserId) {
    return res.status(403).json({ message: "Not Authorized!" });
  }

  let updatedPassword = null;
  try {
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...inputs,
        ...(updatedPassword && { password: updatedPassword }),
        ...(avatar && { avatar }),
      },
    });

    await redisClient.del(`user:${id}`); // invalidate single user cache
    await redisClient.del("users:all"); // invalidate all users list cache
    console.log(`CACHE INVALIDATED for user:${id} and users:all`);

    const { password: userPassword, ...rest } = updatedUser;
    res.status(200).json(rest);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update users!" });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  if (id !== tokenUserId) {
    return res.status(403).json({ message: "Not Authorized!" });
  }

  try {
    await prisma.user.delete({
      where: { id },
    });

    await redisClient.del(`user:${id}`);
    await redisClient.del("users:all");
    console.log(`CACHE INVALIDATED for user:${id} and users:all`);

    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete user!" });
  }
};

export const savePost = async (req, res) => {
    const postId = req.body.postId;
    const tokenUserId = req.userId;

    try {
        const savedPost = await prisma.savedPost.findUnique({
            where: {
                userId_postId: {
                    userId: tokenUserId,
                    postId,
                },
            },
        });

        if (savedPost) {
            await prisma.savedPost.delete({
                where: { id: savedPost.id },
            });
            res.status(200).json({ message: "Post removed from saved list" });
        } else {
            await prisma.savedPost.create({
                data: { userId: tokenUserId, postId },
            });
            res.status(200).json({ message: "Post saved" });
        }
        
        const profileCacheKeys = await redisClient.keys(`user:${tokenUserId}:profilePosts:*`);
        if(profileCacheKeys.length > 0){
            await redisClient.del(profileCacheKeys);
            console.log(`CACHE INVALIDATED for user profile pages: ${tokenUserId}`);
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to save post!" });
    }
};

export const profilePosts = async (req, res) => {

    const startTime = process.hrtime();
    
    const tokenUserId = req.userId;
    const postsPerPage = 3;

    const myPostsPage = parseInt(req.query.myPostsPage) || 1;
    const savedPostsPage = parseInt(req.query.savedPostsPage) || 1;

    const cacheKey = `user:${tokenUserId}:profilePosts:my:${myPostsPage}:saved:${savedPostsPage}`;

    try {
        const paginatedData = await getOrSetCache(cacheKey, async () => {
          
          const userPosts = await prisma.post.findMany({
            where: {userId: tokenUserId},
            take: postsPerPage,
            skip: (myPostsPage - 1) * postsPerPage,
          });

          const saved = await prisma.savedPost.findMany({
            where: {userId: tokenUserId},
            take: postsPerPage,
            skip: (savedPostsPage - 1) * postsPerPage,
            include: {post: true},
          });

          const savedPosts = saved.map((item) => item.post);

          const totalUserPosts = await prisma.post.count({
            where: {userId: tokenUserId},
          });

          const totalSavedPosts = await prisma.savedPost.count({
            where: {userId: tokenUserId},
          });

          return{
            userPosts,
            savedPosts,
            totalUserPosts,
            totalSavedPosts,
          };

        }, (status) => {
          const resource = `Profile Posts (My Listings Page: ${myPostsPage}, Saved Listings Page: ${savedPostsPage})`;
          logExecutionTime(startTime, status, resource);
        });

        res.status(200).json(paginatedData);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to get profile posts!" });
    }
};

