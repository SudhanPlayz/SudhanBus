import { auth } from "@sudhanbus/auth";
import { env } from "@sudhanbus/env/server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { requestIdMiddleware } from "@/lib/request-id";
import { rateLimitMiddleware } from "@/middleware/rate-limit";
import { agentsRoutes } from "@/modules/agents/agents.routes";
import { bookingsRoutes } from "@/modules/bookings/bookings.routes";
// Module routes
import { configRoutes } from "@/modules/config/config.routes";
import { paymentsRoutes } from "@/modules/payments/payments.routes";
import { schedulesRoutes } from "@/modules/schedules/schedules.routes";
import { searchRoutes } from "@/modules/search/search.routes";
import { seatsRoutes } from "@/modules/seats/seats.routes";
import type { HonoEnv } from "@/types/hono";

// Side-effect imports: load config into memory, register cron jobs
import "@/config/index";
import "@/lib/cron";

const app = new Hono<HonoEnv>();

// Global middleware
app.use(requestIdMiddleware());
app.use(logger());
app.use(
	"/*",
	cors({
		origin: env.CORS_ORIGIN,
		allowMethods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
		allowHeaders: [
			"Content-Type",
			"Authorization",
			"Idempotency-Key",
			"X-Request-ID",
		],
		credentials: true,
	})
);
app.use("/api/*", rateLimitMiddleware());

// Auth routes (better-auth)
app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));

// API routes
app.route("/api/config", configRoutes);
app.route("/api/search", searchRoutes);
app.route("/api/schedules", schedulesRoutes);
app.route("/api/seats", seatsRoutes);
app.route("/api/bookings", bookingsRoutes);
app.route("/api/payments", paymentsRoutes);
app.route("/api/agents", agentsRoutes);

// Health check
app.get("/api/health", (c) => c.json({ ok: true }));
app.get("/", (c) => c.text("OK"));

export default app;
