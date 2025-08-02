import redisClient from "../lib/redis.js";

const DEFAULT_EXPIRATION = 3600; // 1 hour

export async function getOrSetCache(key, cb) { // key = label of cached data, cb = callback if cache misses
  try {
    const cachedData = await redisClient.get(key);

    if (cachedData != null) {
      console.log(`CACHE HIT for key: ${key}`);
      return JSON.parse(cachedData);
    }

    console.log(`CACHE MISS for key: ${key}`);
    const freshData = await cb();

    if (freshData != null) {
      await redisClient.setEx(key, DEFAULT_EXPIRATION, JSON.stringify(freshData));
    }

    return freshData;
  } catch (error) {
    console.error("Cache utility error:", error);
    // if the cache fails, fall back to fetching directly from the database
    return cb();
  }
}
