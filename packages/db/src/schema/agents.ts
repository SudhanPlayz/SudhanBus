import { relations } from "drizzle-orm";
import {
	boolean,
	index,
	integer,
	pgTable,
	text,
	timestamp,
	uniqueIndex,
} from "drizzle-orm/pg-core";
import { user } from "./auth";

export const agents = pgTable(
	"agents",
	{
		id: text("id").primaryKey(),
		userId: text("user_id")
			.notNull()
			.references(() => user.id),
		agencyName: text("agency_name").notNull(),
		phone: text("phone").notNull(),
		gstin: text("gstin"),
		commissionRate: integer("commission_rate").default(5).notNull(),
		isActive: boolean("is_active").default(true).notNull(),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at")
			.defaultNow()
			.$onUpdate(() => new Date())
			.notNull(),
	},
	(table) => [uniqueIndex("agents_user_idx").on(table.userId)]
);

export const agentWallets = pgTable(
	"agent_wallets",
	{
		id: text("id").primaryKey(),
		agentId: text("agent_id")
			.notNull()
			.references(() => agents.id),
		balancePaise: integer("balance_paise").default(0).notNull(),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at")
			.defaultNow()
			.$onUpdate(() => new Date())
			.notNull(),
	},
	(table) => [uniqueIndex("agent_wallets_agent_idx").on(table.agentId)]
);

export const agentWalletTxns = pgTable(
	"agent_wallet_txns",
	{
		id: text("id").primaryKey(),
		agentId: text("agent_id")
			.notNull()
			.references(() => agents.id, { onDelete: "cascade" }),
		type: text("type").notNull(),
		amountPaise: integer("amount_paise").notNull(),
		balanceAfterPaise: integer("balance_after_paise").notNull(),
		referenceId: text("reference_id"),
		note: text("note"),
		createdAt: timestamp("created_at").defaultNow().notNull(),
	},
	(table) => [
		index("agent_wallet_txns_agent_idx").on(table.agentId, table.createdAt),
	]
);

export const agentsRelations = relations(agents, ({ one, many }) => ({
	user: one(user, {
		fields: [agents.userId],
		references: [user.id],
	}),
	wallet: one(agentWallets, {
		fields: [agents.id],
		references: [agentWallets.agentId],
	}),
	walletTxns: many(agentWalletTxns),
}));

export const agentWalletsRelations = relations(agentWallets, ({ one }) => ({
	agent: one(agents, {
		fields: [agentWallets.agentId],
		references: [agents.id],
	}),
}));

export const agentWalletTxnsRelations = relations(
	agentWalletTxns,
	({ one }) => ({
		agent: one(agents, {
			fields: [agentWalletTxns.agentId],
			references: [agents.id],
		}),
	})
);
