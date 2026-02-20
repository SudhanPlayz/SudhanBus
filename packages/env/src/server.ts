import "dotenv/config";
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
	server: {
		DATABASE_URL: z.string().min(1),
		BETTER_AUTH_SECRET: z.string().min(32),
		BETTER_AUTH_URL: z.url(),
		CORS_ORIGIN: z.url(),
		NODE_ENV: z
			.enum(["development", "production", "test"])
			.default("development"),

		// Redis
		REDIS_URL: z.string().min(1).optional(),

		// CC Avenue
		CCAVENUE_MERCHANT_ID: z.string().min(1).optional(),
		CCAVENUE_ACCESS_CODE: z.string().min(1).optional(),
		CCAVENUE_WORKING_KEY: z.string().min(1).optional(),
		CCAVENUE_REDIRECT_URL: z.string().min(1).optional(),
		CCAVENUE_CANCEL_URL: z.string().min(1).optional(),
		CCAVENUE_BASE_URL: z
			.string()
			.min(1)
			.default("https://test.ccavenue.com/transaction/transaction.do"),

		// Seat locking
		SEAT_LOCK_TTL_SECONDS: z.coerce.number().default(600),
	},
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
});
