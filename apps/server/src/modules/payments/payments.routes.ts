import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { authGuard } from "@/middleware/auth-guard";
import {
	idempotencyMiddleware,
	storeIdempotencyResponse,
} from "@/middleware/idempotency";
import { rateLimitMiddleware } from "@/middleware/rate-limit";
import { err, ok } from "@/types/common";
import type { HonoEnv } from "@/types/hono";
import { handlePaymentResponse, initiatePayment } from "./payments.service";

const createPaymentSchema = z.object({
	bookingId: z.string().min(1),
});

export const paymentsRoutes = new Hono<HonoEnv>();

paymentsRoutes.post(
	"/create",
	authGuard(),
	rateLimitMiddleware({ limit: 10, windowSeconds: 60 }),
	idempotencyMiddleware(),
	zValidator("json", createPaymentSchema),
	async (c) => {
		const { bookingId } = c.req.valid("json");
		const userId = c.get("userId");
		const requestId = c.get("requestId");
		const idempotencyKey = c.req.header("Idempotency-Key");

		try {
			const result = await initiatePayment(
				bookingId,
				userId,
				idempotencyKey,
				requestId
			);

			const responseBody = ok(result);

			if (idempotencyKey) {
				await storeIdempotencyResponse(
					idempotencyKey,
					userId,
					`POST ${c.req.path}`,
					200,
					responseBody
				);
			}

			return c.json(responseBody);
		} catch (error) {
			const message =
				error instanceof Error ? error.message : "Failed to create payment";
			return c.json(err("payment_failed", message), 400);
		}
	}
);

// CCAvenue redirect endpoint — no auth required
paymentsRoutes.post("/response", async (c) => {
	const requestId = c.get("requestId");

	try {
		const body = await c.req.parseBody();
		const encResp = body.encResp;

		if (typeof encResp !== "string") {
			return c.json(err("invalid_response", "Missing encResp"), 400);
		}

		const result = await handlePaymentResponse(encResp, requestId);

		const corsOrigin = c.req.header("Origin") ?? "";
		const baseUrl = corsOrigin || "/";

		if (result.status === "success") {
			return c.redirect(
				`${baseUrl}/payment/success?bookingId=${result.bookingId}`
			);
		}

		return c.redirect(
			`${baseUrl}/payment/failure?bookingId=${result.bookingId}`
		);
	} catch (error) {
		console.error("[payments] Response handler error:", error);
		return c.json(
			err("payment_response_error", "Payment processing failed"),
			500
		);
	}
});
