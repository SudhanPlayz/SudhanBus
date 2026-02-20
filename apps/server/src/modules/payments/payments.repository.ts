import { db } from "@sudhanbus/db";
import { payments } from "@sudhanbus/db/schema";
import { eq } from "drizzle-orm";

interface CreatePaymentInput {
	amountPaise: number;
	bookingId: string;
	id: string;
	idempotencyKey?: string;
	orderId: string;
	userId: string;
}

export const createPayment = async (input: CreatePaymentInput) => {
	const [payment] = await db
		.insert(payments)
		.values({
			id: input.id,
			bookingId: input.bookingId,
			userId: input.userId,
			orderId: input.orderId,
			amountPaise: input.amountPaise,
			status: "created",
			idempotencyKey: input.idempotencyKey ?? null,
		})
		.returning();

	return payment;
};

export const getPaymentByOrderId = async (orderId: string) => {
	return db.query.payments.findFirst({
		where: eq(payments.orderId, orderId),
	});
};

export const getPaymentByBookingId = async (bookingId: string) => {
	return db.query.payments.findFirst({
		where: eq(payments.bookingId, bookingId),
	});
};

export const updatePaymentSuccess = async (
	orderId: string,
	trackingId: string,
	bankRefNo: string,
	gatewayResponse: unknown
) => {
	return db
		.update(payments)
		.set({
			status: "success",
			trackingId,
			bankRefNo,
			gatewayResponse: gatewayResponse as Record<string, unknown>,
		})
		.where(eq(payments.orderId, orderId));
};

export const updatePaymentFailed = async (
	orderId: string,
	failureMessage: string,
	gatewayResponse: unknown
) => {
	return db
		.update(payments)
		.set({
			status: "failed",
			failureMessage,
			gatewayResponse: gatewayResponse as Record<string, unknown>,
		})
		.where(eq(payments.orderId, orderId));
};
