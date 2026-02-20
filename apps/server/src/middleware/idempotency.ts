import { db } from "@sudhanbus/db";
import { idempotencyKeys } from "@sudhanbus/db/schema";
import { and, eq, gt } from "drizzle-orm";
import { createMiddleware } from "hono/factory";
import type { HonoEnv } from "@/types/hono";

export const idempotencyMiddleware = () =>
	createMiddleware<HonoEnv>(async (c, next) => {
		const key = c.req.header("Idempotency-Key");

		if (!key) {
			return c.json(
				{
					ok: false,
					error: {
						code: "missing_idempotency_key",
						message: "Idempotency-Key header is required",
					},
				},
				400
			);
		}

		const userId = c.get("userId");
		const endpoint = `${c.req.method} ${c.req.path}`;

		const existing = await db.query.idempotencyKeys.findFirst({
			where: and(
				eq(idempotencyKeys.key, key),
				eq(idempotencyKeys.userId, userId),
				eq(idempotencyKeys.endpoint, endpoint),
				gt(idempotencyKeys.expiresAt, new Date())
			),
		});

		if (existing) {
			return c.json(
				existing.responseBody as Record<string, unknown>,
				existing.responseStatus as 200
			);
		}

		await next();
	});

export const storeIdempotencyResponse = async (
	key: string,
	userId: string,
	endpoint: string,
	responseStatus: number,
	responseBody: unknown
): Promise<void> => {
	const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

	await db
		.insert(idempotencyKeys)
		.values({
			key,
			userId,
			endpoint,
			responseStatus,
			responseBody: responseBody as Record<string, unknown>,
			expiresAt,
		})
		.onConflictDoNothing();
};
