import { createCipheriv, createDecipheriv, createHash } from "node:crypto";
import { env } from "@sudhanbus/env/server";

const getKey = (): Buffer => {
	const workingKey = env.CCAVENUE_WORKING_KEY;
	if (!workingKey) {
		throw new Error("CCAVENUE_WORKING_KEY is not configured");
	}
	return createHash("md5").update(workingKey).digest();
};

export const encrypt = (plainText: string): string => {
	const key = getKey();
	const iv = Buffer.alloc(16, 0);
	const cipher = createCipheriv("aes-128-cbc", key, iv);
	return cipher.update(plainText, "utf8", "hex") + cipher.final("hex");
};

export const decrypt = (encryptedHex: string): string => {
	const key = getKey();
	const iv = Buffer.alloc(16, 0);
	const decipher = createDecipheriv("aes-128-cbc", key, iv);
	return decipher.update(encryptedHex, "hex", "utf8") + decipher.final("utf8");
};

export const buildMerchantData = (params: {
	orderId: string;
	amount: string;
	redirectUrl: string;
	cancelUrl: string;
	billingName?: string;
	billingEmail?: string;
}): string => {
	const merchantId = env.CCAVENUE_MERCHANT_ID;
	if (!merchantId) {
		throw new Error("CCAVENUE_MERCHANT_ID is not configured");
	}

	const fields: Record<string, string> = {
		merchant_id: merchantId,
		order_id: params.orderId,
		currency: "INR",
		amount: params.amount,
		redirect_url: params.redirectUrl,
		cancel_url: params.cancelUrl,
		language: "EN",
	};

	if (params.billingName) {
		fields.billing_name = params.billingName;
	}
	if (params.billingEmail) {
		fields.billing_email = params.billingEmail;
	}

	return Object.entries(fields)
		.map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
		.join("&");
};

export const parseResponseString = (data: string): Map<string, string> => {
	const map = new Map<string, string>();
	for (const pair of data.split("&")) {
		const eqIndex = pair.indexOf("=");
		if (eqIndex === -1) {
			continue;
		}
		const key = pair.slice(0, eqIndex);
		const value = decodeURIComponent(pair.slice(eqIndex + 1));
		map.set(key, value);
	}
	return map;
};
