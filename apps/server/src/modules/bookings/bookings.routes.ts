import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { authGuard } from "@/middleware/auth-guard";
import { rateLimitMiddleware } from "@/middleware/rate-limit";
import { err, ok } from "@/types/common";
import type { HonoEnv } from "@/types/hono";
import {
	cancelBooking,
	createBooking,
	getBooking,
	listBookings,
} from "./bookings.service";

const createBookingSchema = z.object({
	scheduleId: z.string().min(1),
	seatIds: z.array(z.string().min(1)).min(1).max(6),
	boardingPoint: z.string().min(1),
	droppingPoint: z.string().min(1),
	passengers: z
		.array(
			z.object({
				seatId: z.string().min(1),
				name: z.string().min(1),
				age: z.number().int().min(1).max(120),
				gender: z.enum(["male", "female", "other"]),
			})
		)
		.min(1)
		.max(6),
});

const listQuerySchema = z.object({
	page: z.coerce.number().int().positive().default(1),
	limit: z.coerce.number().int().min(1).max(50).default(20),
	status: z.string().optional(),
});

export const bookingsRoutes = new Hono<HonoEnv>();

bookingsRoutes.use("/*", authGuard());

bookingsRoutes.post(
	"/",
	rateLimitMiddleware({ limit: 20, windowSeconds: 60 }),
	zValidator("json", createBookingSchema),
	async (c) => {
		const body = c.req.valid("json");
		const userId = c.get("userId");
		const requestId = c.get("requestId");

		try {
			const result = await createBooking(body, userId, requestId);
			return c.json(ok(result), 201);
		} catch (error) {
			const message =
				error instanceof Error ? error.message : "Failed to create booking";
			return c.json(err("booking_failed", message), 400);
		}
	}
);

bookingsRoutes.get("/", zValidator("query", listQuerySchema), async (c) => {
	const { page, limit, status } = c.req.valid("query");
	const userId = c.get("userId");

	const { rows, total } = await listBookings(userId, page, limit, status);

	return c.json(
		ok(rows, {
			page,
			limit,
			total,
			totalPages: Math.ceil(total / limit),
		})
	);
});

bookingsRoutes.get("/:id", async (c) => {
	const id = c.req.param("id");
	const userId = c.get("userId");

	const booking = await getBooking(id, userId);

	if (!booking) {
		return c.json(err("not_found", "Booking not found"), 404);
	}

	return c.json(ok(booking));
});

bookingsRoutes.delete("/:id", async (c) => {
	const id = c.req.param("id");
	const userId = c.get("userId");
	const requestId = c.get("requestId");

	try {
		const result = await cancelBooking(id, userId, requestId);
		return c.json(ok(result));
	} catch (error) {
		const message =
			error instanceof Error ? error.message : "Failed to cancel booking";
		return c.json(err("cancel_failed", message), 400);
	}
});
