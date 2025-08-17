import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";
import { getOrSetCache } from "../utils/cache.js";
import redisClient from "../lib/redis.js";

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

        let message;

        if (savedPost) {
            await prisma.savedPost.delete({
                where: { id: savedPost.id },
            });
            message = "Post removed from saved list";
        } else {
            await prisma.savedPost.create({
                data: { userId: tokenUserId, postId },
            });
            message = "Post saved";
        }
        
        const profilePostsCacheKey = `user:${tokenUserId}:profilePosts`;
        await redisClient.del(profilePostsCacheKey);
        console.log(`CACHE INVALIDATED for key: ${profilePostsCacheKey}`);

        res.status(200).json({ message });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to save post!" });
    }
};

export const profilePosts = async (req, res) => {
    const tokenUserId = req.userId;
    const cacheKey = `user:${tokenUserId}:profilePosts`;

    try {
        const userPosts = await getOrSetCache(cacheKey, async () => {
            const posts = await prisma.post.findMany({
                where: { userId: tokenUserId },
            });
            const saved = await prisma.savedPost.findMany({
                where: { userId: tokenUserId },
                include: { post: true },
            });
            const savedPosts = saved.map((item) => item.post);
            return { userPosts: posts, savedPosts };
        });

        res.status(200).json(userPosts);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to get profile posts!" });
    }
};

