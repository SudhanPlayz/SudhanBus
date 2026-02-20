import { createId } from "@paralleldrive/cuid2";
import { env } from "@sudhanbus/env/server";
import { writeAuditLog } from "@/lib/audit";
import {
	confirmBookingTransaction,
	getBookingById,
} from "@/modules/bookings/bookings.repository";
import { releaseSeats } from "@/modules/seats/seats.repository";
import { formatPaiseForGateway } from "@/types/common";
import {
	buildMerchantData,
	decrypt,
	encrypt,
	parseResponseString,
} from "./ccavenue";
import {
	createPayment,
	getPaymentByOrderId,
	updatePaymentFailed,
	updatePaymentSuccess,
} from "./payments.repository";

export const initiatePayment = async (
	bookingId: string,
	userId: string,
	idempotencyKey?: string,
	requestId?: string
) => {
	const booking = await getBookingById(bookingId);

	if (!booking) {
		throw new Error("Booking not found");
	}

	if (booking.userId !== userId) {
		throw new Error("Booking does not belong to you");
	}

	if (booking.status !== "pending_payment") {
		throw new Error("Booking is not awaiting payment");
	}

	const orderId = `SB_${createId()}`;
	const paymentId = createId();

	const redirectUrl = env.CCAVENUE_REDIRECT_URL;
	const cancelUrl = env.CCAVENUE_CANCEL_URL;

	if (!(redirectUrl && cancelUrl)) {
		throw new Error("Payment gateway not configured");
	}

	const merchantData = buildMerchantData({
		orderId,
		amount: formatPaiseForGateway(booking.totalPaise),
		redirectUrl,
		cancelUrl,
	});

	const encRequest = encrypt(merchantData);

	await createPayment({
		id: paymentId,
		bookingId,
		userId,
		orderId,
		amountPaise: booking.totalPaise,
		idempotencyKey,
	});

	writeAuditLog({
		actorId: userId,
		actorType: "user",
		action: "payment.created",
		entityType: "payment",
		entityId: paymentId,
		payload: { orderId, bookingId },
		requestId,
	});

	return {
		orderId,
		encRequest,
		accessCode: env.CCAVENUE_ACCESS_CODE ?? "",
		gatewayUrl: env.CCAVENUE_BASE_URL,
	};
};

export const handlePaymentResponse = async (
	encResp: string,
	requestId?: string
) => {
	const decrypted = decrypt(encResp);
	const responseMap = parseResponseString(decrypted);

	const orderId = responseMap.get("order_id");
	const orderStatus = responseMap.get("order_status");
	const trackingId = responseMap.get("tracking_id") ?? "";
	const bankRefNo = responseMap.get("bank_ref_no") ?? "";
	const failureMessage = responseMap.get("failure_message") ?? "";

	if (!orderId) {
		throw new Error("Missing order_id in payment response");
	}

	const payment = await getPaymentByOrderId(orderId);

	if (!payment) {
		throw new Error(`Payment not found for order ${orderId}`);
	}

	if (payment.status !== "created") {
		return { bookingId: payment.bookingId, status: payment.status };
	}

	const responseData = Object.fromEntries(responseMap);

	if (orderStatus === "Success") {
		await updatePaymentSuccess(orderId, trackingId, bankRefNo, responseData);

		const booking = await getBookingById(payment.bookingId);

		if (booking) {
			const pnr = `SB${Date.now().toString(36).toUpperCase()}`;
			await confirmBookingTransaction(
				booking.id,
				pnr,
				booking.seatIds,
				booking.seatIds.length,
				booking.scheduleId
			);

			writeAuditLog({
				actorId: null,
				actorType: "system",
				action: "booking.confirmed",
				entityType: "booking",
				entityId: booking.id,
				payload: { pnr, orderId, trackingId },
				requestId,
			});
		}

		return { bookingId: payment.bookingId, status: "success" };
	}

	await updatePaymentFailed(orderId, failureMessage, responseData);

	const booking = await getBookingById(payment.bookingId);
	if (booking) {
		await releaseSeats(booking.seatIds);

		writeAuditLog({
			actorId: null,
			actorType: "system",
			action: "payment.failed",
			entityType: "payment",
			entityId: payment.id,
			payload: { orderId, failureMessage },
			requestId,
		});
	}

	return { bookingId: payment.bookingId, status: "failed" };
};
