import { Hono } from "hono";
import { AMENITIES, BUS_TYPES, CITIES, SEAT_TYPES } from "@/config";
import { ok } from "@/types/common";
import type { HonoEnv } from "@/types/hono";

export const configRoutes = new Hono<HonoEnv>();

configRoutes.get("/cities", (c) => {
	c.header("Cache-Control", "public, max-age=3600");
	return c.json(ok(CITIES));
});

configRoutes.get("/amenities", (c) => {
	c.header("Cache-Control", "public, max-age=3600");
	return c.json(ok(AMENITIES));
});

configRoutes.get("/bus-types", (c) => {
	c.header("Cache-Control", "public, max-age=3600");
	return c.json(ok(BUS_TYPES));
});

configRoutes.get("/seat-types", (c) => {
	c.header("Cache-Control", "public, max-age=3600");
	return c.json(ok(SEAT_TYPES));
});
