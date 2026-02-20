import { randomUUID } from "node:crypto";
import { createMiddleware } from "hono/factory";
import type { HonoEnv } from "@/types/hono";

export const requestIdMiddleware = () =>
	createMiddleware<HonoEnv>(async (c, next) => {
		const id = c.req.header("X-Request-ID") ?? randomUUID();
		c.set("requestId", id);
		c.header("X-Request-ID", id);
		await next();
	});
