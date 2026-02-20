import { createId } from "@paralleldrive/cuid2";
import { db } from "@sudhanbus/db";
import { auditLogs } from "@sudhanbus/db/schema";

interface AuditParams {
	action: string;
	actorId: string | null;
	actorType: "user" | "agent" | "system";
	entityId: string;
	entityType: string;
	ipAddress?: string;
	payload?: unknown;
	requestId?: string;
}

export const writeAuditLog = (params: AuditParams): void => {
	db.insert(auditLogs)
		.values({
			id: createId(),
			actorId: params.actorId,
			actorType: params.actorType,
			action: params.action,
			entityType: params.entityType,
			entityId: params.entityId,
			payload: params.payload as Record<string, unknown> | null,
			ipAddress: params.ipAddress ?? null,
			requestId: params.requestId ?? null,
		})
		.catch((error: unknown) => {
			console.error("[audit] Failed to write audit log:", error);
		});
};
