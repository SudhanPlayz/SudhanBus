import { auth } from "@sudhanbus/auth";
import { createMiddleware } from "hono/factory";
import type { HonoEnv } from "@/types/hono";

export const authGuard = () =>
	createMiddleware<HonoEnv>(async (c, next) => {
		const session = await auth.api.getSession({
			headers: c.req.raw.headers,
		});

		if (!session) {
			return c.json(
				{
					ok: false,
					error: { code: "unauthorized", message: "Authentication required" },
				},
				401
			);
		}

		c.set("userId", session.user.id);
		c.set("sessionId", session.session.id);
		await next();
	});
