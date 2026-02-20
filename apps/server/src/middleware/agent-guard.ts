import { db } from "@sudhanbus/db";
import { agents } from "@sudhanbus/db/schema";
import { eq } from "drizzle-orm";
import { createMiddleware } from "hono/factory";
import type { HonoEnv } from "@/types/hono";

export const agentGuard = () =>
	createMiddleware<HonoEnv>(async (c, next) => {
		const userId = c.get("userId");

		const agent = await db.query.agents.findFirst({
			where: eq(agents.userId, userId),
		});

		if (!(agent && agent.isActive)) {
			return c.json(
				{
					ok: false,
					error: {
						code: "agent_required",
						message: "Active agent account required",
					},
				},
				403
			);
		}

		c.set("agentId", agent.id);
		await next();
	});
