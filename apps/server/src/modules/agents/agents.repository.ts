import { db } from "@sudhanbus/db";
import { agents, agentWallets, agentWalletTxns } from "@sudhanbus/db/schema";
import { count, desc, eq, sql } from "drizzle-orm";

export const getAgentByUserId = async (userId: string) => {
	return await db.query.agents.findFirst({
		where: eq(agents.userId, userId),
		with: { wallet: true },
	});
};

export const getAgentById = async (agentId: string) => {
	return await db.query.agents.findFirst({
		where: eq(agents.id, agentId),
		with: { wallet: true },
	});
};

export const getWalletBalance = async (agentId: string) => {
	return await db.query.agentWallets.findFirst({
		where: eq(agentWallets.agentId, agentId),
	});
};

export const getWalletTransactions = async (
	agentId: string,
	page: number,
	limit: number
) => {
	const offset = (page - 1) * limit;

	const [rows, totalResult] = await Promise.all([
		db
			.select()
			.from(agentWalletTxns)
			.where(eq(agentWalletTxns.agentId, agentId))
			.orderBy(desc(agentWalletTxns.createdAt))
			.limit(limit)
			.offset(offset),
		db
			.select({ total: count() })
			.from(agentWalletTxns)
			.where(eq(agentWalletTxns.agentId, agentId)),
	]);

	return { rows, total: totalResult[0]?.total ?? 0 };
};

export const creditWallet = async (
	agentId: string,
	amountPaise: number,
	txnId: string,
	referenceId?: string,
	note?: string
) => {
	return await db.transaction(async (tx) => {
		await tx
			.update(agentWallets)
			.set({
				balancePaise: sql`${agentWallets.balancePaise} + ${amountPaise}`,
			})
			.where(eq(agentWallets.agentId, agentId));

		const wallet = await tx.query.agentWallets.findFirst({
			where: eq(agentWallets.agentId, agentId),
		});

		await tx.insert(agentWalletTxns).values({
			id: txnId,
			agentId,
			type: "credit",
			amountPaise,
			balanceAfterPaise: wallet?.balancePaise ?? amountPaise,
			referenceId: referenceId ?? null,
			note: note ?? null,
		});

		return wallet;
	});
};
