import { createMiddleware } from "hono/factory";
import { redis } from "@/lib/redis";
import type { HonoEnv } from "@/types/hono";

interface RateLimitOptions {
	limit?: number;
	windowSeconds?: number;
}

const LUA_SCRIPT = `
local count = redis.call("INCR", KEYS[1])
if count == 1 then
  redis.call("EXPIRE", KEYS[1], ARGV[2])
end
if count > tonumber(ARGV[1]) then
  return redis.call("PTTL", KEYS[1])
end
return 0
`;

export const rateLimitMiddleware = (options?: RateLimitOptions) =>
	createMiddleware<HonoEnv>(async (c, next) => {
		if (!redis) {
			await next();
			return;
		}

		const limit = options?.limit ?? 100;
		const windowSeconds = options?.windowSeconds ?? 60;

		const ip =
			c.req.header("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
		const userId = c.get("userId") ?? "";
		const key = `ratelimit:${ip}:${userId}`;

		const ttlMs = (await redis.eval(
			LUA_SCRIPT,
			1,
			key,
			String(limit),
			String(windowSeconds)
		)) as number;

		c.header("X-RateLimit-Limit", String(limit));

		if (ttlMs > 0) {
			c.header("Retry-After", String(Math.ceil(ttlMs / 1000)));
			return c.json(
				{
					ok: false,
					error: {
						code: "rate_limit_exceeded",
						message: "Too many requests",
					},
				},
				429
			);
		}

		await next();
	});
