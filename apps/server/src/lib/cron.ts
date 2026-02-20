import { db } from "@sudhanbus/db";
import { seats } from "@sudhanbus/db/schema";
import { and, eq, lt } from "drizzle-orm";

// Clean up expired seat locks every 2 minutes
// Redis TTLs handle the fast path; this is a Postgres consistency backstop
const cleanupExpiredLocks = async () => {
	const result = await db
		.update(seats)
		.set({
			status: "available",
			lockedByUser: null,
			lockedUntil: null,
		})
		.where(and(eq(seats.status, "locked"), lt(seats.lockedUntil, new Date())));

	if (result.rowCount && result.rowCount > 0) {
		console.info(
			`[cron] Released ${String(result.rowCount)} expired seat locks`
		);
	}
};

// Run every 2 minutes
setInterval(
	() => {
		cleanupExpiredLocks().catch((error: unknown) => {
			console.error("[cron] Lock cleanup failed:", error);
		});
	},
	2 * 60 * 1000
);
