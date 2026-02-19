"use client";

import { User } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PassengerInfo {
	age: string;
	gender: "male" | "female" | "other";
	name: string;
	seatId: string;
}

interface StepPassengerInfoProps {
	onPassengerChange: (passengers: PassengerInfo[]) => void;
	passengers: PassengerInfo[];
	selectedSeats: string[];
}

export function StepPassengerInfo({
	selectedSeats,
	passengers,
	onPassengerChange,
}: StepPassengerInfoProps) {
	const updatePassenger = (
		seatId: string,
		field: keyof PassengerInfo,
		value: string
	) => {
		const updated = passengers.map((p) =>
			p.seatId === seatId ? { ...p, [field]: value } : p
		);
		onPassengerChange(updated);
	};

	return (
		<div className="space-y-3">
			<div>
				<h3 className="font-semibold text-base">Passenger Information</h3>
				<p className="text-muted-foreground text-sm">
					Enter details for {selectedSeats.length} passenger
					{selectedSeats.length > 1 ? "s" : ""}
				</p>
			</div>
			<div className="space-y-3">
				{passengers.map((passenger, idx) => (
					<div
						className="space-y-3 rounded-xl border-2 border-border p-3"
						key={passenger.seatId}
					>
						<div className="flex items-center gap-2">
							<div className="flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
								<User className="size-3.5" />
							</div>
							<span className="font-medium text-sm">
								Passenger {idx + 1} — Seat {passenger.seatId}
							</span>
						</div>

						<div className="grid gap-3 sm:grid-cols-3">
							<div className="space-y-1">
								<label
									className="font-medium text-muted-foreground text-xs"
									htmlFor={`name-${passenger.seatId}`}
								>
									Full Name
								</label>
								<input
									className="h-9 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/50"
									id={`name-${passenger.seatId}`}
									onChange={(e) =>
										updatePassenger(passenger.seatId, "name", e.target.value)
									}
									placeholder="Enter name"
									type="text"
									value={passenger.name}
								/>
							</div>
							<div className="space-y-1">
								<label
									className="font-medium text-muted-foreground text-xs"
									htmlFor={`age-${passenger.seatId}`}
								>
									Age
								</label>
								<input
									className="h-9 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/50"
									id={`age-${passenger.seatId}`}
									onChange={(e) =>
										updatePassenger(passenger.seatId, "age", e.target.value)
									}
									placeholder="Age"
									type="number"
									value={passenger.age}
								/>
							</div>
							<div className="space-y-1">
								<label className="font-medium text-muted-foreground text-xs">
									Gender
								</label>
								<div className="flex gap-1.5">
									{(["male", "female", "other"] as const).map((g) => (
										<button
											className={cn(
												"flex-1 rounded-lg border px-2 py-1.5 font-medium text-xs capitalize transition-colors",
												passenger.gender === g
													? "border-primary bg-primary/10 text-primary"
													: "border-border hover:bg-muted/50"
											)}
											key={g}
											onClick={() =>
												updatePassenger(passenger.seatId, "gender", g)
											}
											type="button"
										>
											{g}
										</button>
									))}
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
