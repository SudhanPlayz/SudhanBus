import { relations } from "drizzle-orm";
import {
	index,
	integer,
	jsonb,
	pgEnum,
	pgTable,
	text,
	timestamp,
} from "drizzle-orm/pg-core";
import { user } from "./auth";
import { bookings } from "./bookings";

export const paymentStatusEnum = pgEnum("payment_status", [
	"created",
	"pending",
	"success",
	"failed",
	"refunded",
]);

export const payments = pgTable(
	"payments",
	{
		id: text("id").primaryKey(),
		bookingId: text("booking_id")
			.notNull()
			.references(() => bookings.id),
		userId: text("user_id")
			.notNull()
			.references(() => user.id),
		orderId: text("order_id").notNull().unique(),
		trackingId: text("tracking_id").unique(),
		bankRefNo: text("bank_ref_no"),
		amountPaise: integer("amount_paise").notNull(),
		currency: text("currency").default("INR").notNull(),
		status: paymentStatusEnum("status").default("created").notNull(),
		gateway: text("gateway").default("ccavenue").notNull(),
		failureMessage: text("failure_message"),
		gatewayResponse: jsonb("gateway_response"),
		idempotencyKey: text("idempotency_key").unique(),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at")
			.defaultNow()
			.$onUpdate(() => new Date())
			.notNull(),
	},
	(table) => [
		index("payments_booking_idx").on(table.bookingId),
		index("payments_user_idx").on(table.userId, table.createdAt),
	]
);

export const paymentsRelations = relations(payments, ({ one }) => ({
	booking: one(bookings, {
		fields: [payments.bookingId],
		references: [bookings.id],
	}),
	user: one(user, {
		fields: [payments.userId],
		references: [user.id],
	}),
}));
