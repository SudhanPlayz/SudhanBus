import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { err, ok } from "@/types/common";
import type { HonoEnv } from "@/types/hono";
import { search } from "./search.service";

const searchQuerySchema = z.object({
	from: z.string().min(1),
	to: z.string().min(1),
	date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
	busType: z.string().optional(),
	amenities: z.string().optional(),
	minPrice: z.coerce.number().int().nonnegative().optional(),
	maxPrice: z.coerce.number().int().nonnegative().optional(),
	sortBy: z.enum(["price", "rating", "departure", "duration"]).optional(),
	page: z.coerce.number().int().positive().default(1),
	limit: z.coerce.number().int().min(1).max(50).default(20),
});

export const searchRoutes = new Hono<HonoEnv>();

searchRoutes.get("/", zValidator("query", searchQuerySchema), async (c) => {
	const params = c.req.valid("query");

	try {
		const { results, meta } = await search(params);
		return c.json(ok(results, meta));
	} catch (error) {
		const message = error instanceof Error ? error.message : "Search failed";
		return c.json(err("search_failed", message), 400);
	}
});
