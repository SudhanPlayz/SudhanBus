import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { agentGuard } from "@/middleware/agent-guard";
import { authGuard } from "@/middleware/auth-guard";
import { err, ok } from "@/types/common";
import type { HonoEnv } from "@/types/hono";
import {
	getAgentProfile,
	getAgentTransactions,
	getAgentWallet,
	topUpWallet,
} from "./agents.service";

const listQuerySchema = z.object({
	page: z.coerce.number().int().positive().default(1),
	limit: z.coerce.number().int().min(1).max(50).default(20),
});

const topUpSchema = z.object({
	amountPaise: z.number().int().positive(),
});

export const agentsRoutes = new Hono<HonoEnv>();

agentsRoutes.use("/*", authGuard());
agentsRoutes.use("/*", agentGuard());

agentsRoutes.get("/me", async (c) => {
	const userId = c.get("userId");
	const profile = await getAgentProfile(userId);

	if (!profile) {
		return c.json(err("not_found", "Agent profile not found"), 404);
	}

	return c.json(ok(profile));
});

agentsRoutes.get("/me/wallet", async (c) => {
	const agentId = c.get("agentId");

	if (!agentId) {
		return c.json(err("not_found", "Agent not found"), 404);
	}

	const wallet = await getAgentWallet(agentId);

	if (!wallet) {
		return c.json(err("not_found", "Wallet not found"), 404);
	}

	return c.json(ok(wallet));
});

agentsRoutes.get(
	"/me/wallet/transactions",
	zValidator("query", listQuerySchema),
	async (c) => {
		const agentId = c.get("agentId");
		const { page, limit } = c.req.valid("query");

		if (!agentId) {
			return c.json(err("not_found", "Agent not found"), 404);
		}

		const { rows, total } = await getAgentTransactions(agentId, page, limit);

		return c.json(
			ok(rows, {
				page,
				limit,
				total,
				totalPages: Math.ceil(total / limit),
			})
		);
	}
);

agentsRoutes.post(
	"/me/wallet/topup",
	zValidator("json", topUpSchema),
	async (c) => {
		const agentId = c.get("agentId");
		const { amountPaise } = c.req.valid("json");
		const requestId = c.get("requestId");

		if (!agentId) {
			return c.json(err("not_found", "Agent not found"), 404);
		}

		try {
			const result = await topUpWallet(agentId, amountPaise, requestId);
			return c.json(ok(result));
		} catch (error) {
			const message =
				error instanceof Error ? error.message : "Failed to top up";
			return c.json(err("topup_failed", message), 400);
		}
	}
);
