import { env } from "@sudhanbus/env/server";
import Redis from "ioredis";

export const redis = env.REDIS_URL
	? new Redis(env.REDIS_URL, {
			maxRetriesPerRequest: 3,
			lazyConnect: false,
		})
	: null;

export const getRedis = (): Redis => {
	if (!redis) {
		throw new Error("Redis is not configured. Set REDIS_URL env variable.");
	}
	return redis;
};
