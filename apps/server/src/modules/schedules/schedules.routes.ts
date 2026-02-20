import { Hono } from "hono";
import { err, ok } from "@/types/common";
import type { HonoEnv } from "@/types/hono";
import { getScheduleDetail, getScheduleSeats } from "./schedules.service";

export const schedulesRoutes = new Hono<HonoEnv>();

schedulesRoutes.get("/:id", async (c) => {
	const id = c.req.param("id");
	const schedule = await getScheduleDetail(id);

	if (!schedule) {
		return c.json(err("not_found", "Schedule not found"), 404);
	}

	return c.json(ok(schedule));
});

schedulesRoutes.get("/:id/seats", async (c) => {
	const id = c.req.param("id");
	const layout = await getScheduleSeats(id);

	if (!layout) {
		return c.json(err("not_found", "Seat layout not found"), 404);
	}

	return c.json(ok(layout));
});
