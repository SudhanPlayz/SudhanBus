"use client";

import { Armchair, MapPin, MapPinned, User, Pencil } from "lucide-react";
import { BOARDING_POINTS, DROPPING_POINTS } from "./seat-data";
import type { PassengerInfo } from "./step-passenger-info";

interface StepReviewProps {
	selectedSeats: string[];
	totalPrice: number;
	boardingPoint: string | null;
	droppingPoint: string | null;
	passengers: PassengerInfo[];
	busName: string;
	onEditStep: (step: number) => void;
}

export function StepReview({
	selectedSeats,
	totalPrice,
	boardingPoint,
	droppingPoint,
	passengers,
	busName,
	onEditStep,
}: StepReviewProps) {
	const boarding = BOARDING_POINTS.find((b) => b.id === boardingPoint);
	const dropping = DROPPING_POINTS.find((d) => d.id === droppingPoint);

	return (
		<div className="space-y-5">
			<div>
				<h3 className="font-semibold text-base">Review Your Booking</h3>
				<p className="text-muted-foreground text-sm">
					Please verify all details before proceeding to payment.
				</p>
			</div>

			{/* Seats Section */}
			<section className="rounded-xl border p-4">
				<div className="mb-3 flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Armchair className="size-4 text-primary" />
						<span className="font-semibold text-sm">Selected Seats</span>
					</div>
					<button
						className="flex items-center gap-1 text-xs text-primary hover:underline"
						onClick={() => onEditStep(1)}
						type="button"
					>
						<Pencil className="size-3" />
						Edit
					</button>
				</div>
				<div className="flex flex-wrap gap-2">
					{selectedSeats.map((seat) => (
						<span
							className="rounded-lg border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary"
							key={seat}
						>
							{seat}
						</span>
					))}
				</div>
			</section>

			{/* Journey Section */}
			<section className="rounded-xl border p-4">
				<div className="mb-3 flex items-center justify-between">
					<span className="font-semibold text-sm">Journey Details</span>
					<button
						className="flex items-center gap-1 text-xs text-primary hover:underline"
						onClick={() => onEditStep(2)}
						type="button"
					>
						<Pencil className="size-3" />
						Edit
					</button>
				</div>
				<div className="space-y-2.5">
					<div className="flex items-center gap-2 text-sm">
						<span className="font-medium text-muted-foreground">{busName}</span>
					</div>
					{boarding && (
						<div className="flex items-start gap-2 text-sm">
							<MapPin className="mt-0.5 size-4 shrink-0 text-emerald-500" />
							<div>
								<span className="font-medium">Boarding:</span>{" "}
								<span className="text-muted-foreground">
									{boarding.name} · {boarding.time}
								</span>
								{boarding.address && (
									<p className="text-xs text-muted-foreground/70">
										{boarding.address}
									</p>
								)}
							</div>
						</div>
					)}
					{dropping && (
						<div className="flex items-start gap-2 text-sm">
							<MapPinned className="mt-0.5 size-4 shrink-0 text-red-500" />
							<div>
								<span className="font-medium">Dropping:</span>{" "}
								<span className="text-muted-foreground">
									{dropping.name} · {dropping.time}
								</span>
								{dropping.address && (
									<p className="text-xs text-muted-foreground/70">
										{dropping.address}
									</p>
								)}
							</div>
						</div>
					)}
				</div>
			</section>

			{/* Passengers Section */}
			<section className="rounded-xl border p-4">
				<div className="mb-3 flex items-center justify-between">
					<div className="flex items-center gap-2">
						<User className="size-4 text-primary" />
						<span className="font-semibold text-sm">Passengers</span>
					</div>
					<button
						className="flex items-center gap-1 text-xs text-primary hover:underline"
						onClick={() => onEditStep(4)}
						type="button"
					>
						<Pencil className="size-3" />
						Edit
					</button>
				</div>
				<div className="divide-y">
					{passengers.map((p, i) => (
						<div className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0" key={p.seatId}>
							<div>
								<span className="font-medium text-sm">{p.name || `Passenger ${i + 1}`}</span>
								<p className="text-xs text-muted-foreground">
									{p.age ? `${p.age} yrs` : "—"} · {p.gender}
								</p>
							</div>
							<span className="rounded-md bg-muted px-2 py-1 text-xs font-medium">
								Seat {p.seatId}
							</span>
						</div>
					))}
				</div>
			</section>

			{/* Price Summary */}
			<section className="rounded-xl bg-primary/5 p-4">
				<div className="flex items-center justify-between">
					<span className="font-semibold text-sm">Total Amount</span>
					<span className="font-bold text-lg text-primary">
						₹{totalPrice.toLocaleString()}
					</span>
				</div>
				<p className="mt-1 text-xs text-muted-foreground">
					{selectedSeats.length} seat{selectedSeats.length > 1 ? "s" : ""} × base fare
				</p>
			</section>
		</div>
	);
}
