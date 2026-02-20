import { env } from "@sudhanbus/env/server";
import { writeAuditLog } from "@/lib/audit";
import { redis } from "@/lib/redis";
import {
	getSeatsByIds,
	lockSeatsInDb,
	unlockSeatsInDb,
} from "./seats.repository";

const LOCK_SEATS_LUA = `
for i = 1, #KEYS do
  local current = redis.call("GET", KEYS[i])
  if current and current ~= ARGV[1] then
    return "SEAT_TAKEN:" .. KEYS[i]
  end
end
for i = 1, #KEYS do
  redis.call("SET", KEYS[i], ARGV[1], "EX", tonumber(ARGV[2]))
end
return "OK"
`;

export const lockSeats = async (
	scheduleId: string,
	seatIds: string[],
	userId: string,
	requestId?: string
) => {
	if (seatIds.length > 6) {
		throw new Error("Cannot lock more than 6 seats at once");
	}

	const seatRows = await getSeatsByIds(seatIds);

	if (seatRows.length !== seatIds.length) {
		throw new Error("One or more seats not found");
	}

	for (const seat of seatRows) {
		if (seat.scheduleId !== scheduleId) {
			throw new Error(
				`Seat ${seat.seatLabel} does not belong to this schedule`
			);
		}
		if (seat.status !== "available" && seat.lockedByUser !== userId) {
			throw new Error(`Seat ${seat.seatLabel} is not available`);
		}
	}

	const ttl = env.SEAT_LOCK_TTL_SECONDS;
	const expiresAt = new Date(Date.now() + ttl * 1000);

	if (redis) {
		const keys = seatRows.map((s) => `seat:lock:${scheduleId}:${s.seatLabel}`);
		const result = await redis.eval(
			LOCK_SEATS_LUA,
			keys.length,
			...keys,
			userId,
			String(ttl)
		);

		if (typeof result === "string" && result.startsWith("SEAT_TAKEN:")) {
			throw new Error(
				`Seat already taken: ${result.split(":").slice(1).join(":")}`
			);
		}
	}

	await lockSeatsInDb(seatIds, userId, expiresAt);

	writeAuditLog({
		actorId: userId,
		actorType: "user",
		action: "seat.locked",
		entityType: "seat",
		entityId: scheduleId,
		payload: { seatIds, expiresAt: expiresAt.toISOString() },
		requestId,
	});

	return {
		lockedSeats: seatIds,
		expiresAt: expiresAt.toISOString(),
	};
};

export const unlockSeats = async (
	scheduleId: string,
	seatIds: string[],
	userId: string,
	requestId?: string
) => {
	if (redis) {
		const seatRows = await getSeatsByIds(seatIds);
		const keys = seatRows.map((s) => `seat:lock:${scheduleId}:${s.seatLabel}`);
		for (const key of keys) {
			await redis.del(key);
		}
	}

	await unlockSeatsInDb(seatIds, userId);

	writeAuditLog({
		actorId: userId,
		actorType: "user",
		action: "seat.unlocked",
		entityType: "seat",
		entityId: scheduleId,
		payload: { seatIds },
		requestId,
	});

	return { unlockedSeats: seatIds };
};
