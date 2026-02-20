import { createId } from "@paralleldrive/cuid2";
import { writeAuditLog } from "@/lib/audit";
import {
	creditWallet,
	getAgentByUserId,
	getWalletBalance,
	getWalletTransactions,
} from "./agents.repository";

export const getAgentProfile = async (userId: string) => {
	const agent = await getAgentByUserId(userId);
	if (!agent) {
		return null;
	}
	return {
		id: agent.id,
		agencyName: agent.agencyName,
		phone: agent.phone,
		gstin: agent.gstin,
		commissionRate: agent.commissionRate,
		isActive: agent.isActive,
		walletBalance: agent.wallet?.balancePaise ?? 0,
	};
};

export const getAgentWallet = async (agentId: string) => {
	const wallet = await getWalletBalance(agentId);
	if (!wallet) {
		return null;
	}
	return {
		balancePaise: wallet.balancePaise,
		updatedAt: wallet.updatedAt.toISOString(),
	};
};

export const getAgentTransactions = async (
	agentId: string,
	page: number,
	limit: number
) => {
	return getWalletTransactions(agentId, page, limit);
};

export const topUpWallet = async (
	agentId: string,
	amountPaise: number,
	requestId?: string
) => {
	if (amountPaise <= 0) {
		throw new Error("Amount must be positive");
	}

	const txnId = createId();
	const wallet = await creditWallet(
		agentId,
		amountPaise,
		txnId,
		undefined,
		"Manual top-up"
	);

	writeAuditLog({
		actorId: agentId,
		actorType: "agent",
		action: "wallet.topup",
		entityType: "agent_wallet",
		entityId: agentId,
		payload: { amountPaise, txnId },
		requestId,
	});

	return {
		txnId,
		balancePaise: wallet?.balancePaise ?? 0,
	};
};
