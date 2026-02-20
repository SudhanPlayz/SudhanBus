import { integer, jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth";

export const idempotencyKeys = pgTable("idempotency_keys", {
	key: text("key").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id),
	endpoint: text("endpoint").notNull(),
	responseStatus: integer("response_status").notNull(),
	responseBody: jsonb("response_body").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	expiresAt: timestamp("expires_at").notNull(),
});
