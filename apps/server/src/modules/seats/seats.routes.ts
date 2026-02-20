import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { authGuard } from "@/middleware/auth-guard";
import { rateLimitMiddleware } from "@/middleware/rate-limit";
import { err, ok } from "@/types/common";
import type { HonoEnv } from "@/types/hono";
import { lockSeats, unlockSeats } from "./seats.service";

const lockBodySchema = z.object({
	scheduleId: z.string().min(1),
	seatIds: z.array(z.string().min(1)).min(1).max(6),
});

export const seatsRoutes = new Hono<HonoEnv>();

seatsRoutes.use("/*", authGuard());
seatsRoutes.use("/*", rateLimitMiddleware({ limit: 30, windowSeconds: 60 }));

seatsRoutes.post("/lock", zValidator("json", lockBodySchema), async (c) => {
	const { scheduleId, seatIds } = c.req.valid("json");
	const userId = c.get("userId");
	const requestId = c.get("requestId");

	try {
		const result = await lockSeats(scheduleId, seatIds, userId, requestId);
		return c.json(ok(result));
	} catch (error) {
		const message =
			error instanceof Error ? error.message : "Failed to lock seats";
		return c.json(err("lock_failed", message), 409);
	}
});

seatsRoutes.delete("/lock", zValidator("json", lockBodySchema), async (c) => {
	const { scheduleId, seatIds } = c.req.valid("json");
	const userId = c.get("userId");
	const requestId = c.get("requestId");

	try {
		const result = await unlockSeats(scheduleId, seatIds, userId, requestId);
		return c.json(ok(result));
	} catch (error) {
		const message =
			error instanceof Error ? error.message : "Failed to unlock seats";
		return c.json(err("unlock_failed", message), 400);
	}
});
