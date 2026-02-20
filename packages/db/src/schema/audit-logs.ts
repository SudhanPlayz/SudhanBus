import { index, jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const auditLogs = pgTable(
	"audit_logs",
	{
		id: text("id").primaryKey(),
		actorId: text("actor_id"),
		actorType: text("actor_type"),
		action: text("action").notNull(),
		entityType: text("entity_type").notNull(),
		entityId: text("entity_id").notNull(),
		payload: jsonb("payload"),
		ipAddress: text("ip_address"),
		requestId: text("request_id"),
		createdAt: timestamp("created_at").defaultNow().notNull(),
	},
	(table) => [
		index("audit_logs_entity_idx").on(
			table.entityType,
			table.entityId,
			table.createdAt
		),
		index("audit_logs_actor_idx").on(table.actorId, table.createdAt),
	]
);
