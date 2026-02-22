"use client";

import { Armchair, CreditCard, MapPin, MapPinned } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BOARDING_POINTS, DROPPING_POINTS } from "./seat-data";
import type { PassengerInfo } from "./step-passenger-info";

interface StepPaymentProps {
	boardingPoint: string | null;
	busName: string;
	droppingPoint: string | null;
	passengers: PassengerInfo[];
	selectedSeats: string[];
	totalPrice: number;
}

export function StepPayment({
	selectedSeats,
	totalPrice,
	boardingPoint,
	droppingPoint,
	passengers,
	busName,
}: StepPaymentProps) {
	const boarding = BOARDING_POINTS.find((b) => b.id === boardingPoint);
	const dropping = DROPPING_POINTS.find((d) => d.id === droppingPoint);

	return (
		<div className="space-y-4">
			<div>
				<h3 className="font-semibold text-base">Payment Summary</h3>
				<p className="text-muted-foreground text-sm">
					Review your booking details
				</p>
			</div>

			<div className="space-y-3 rounded-xl bg-gray-50 p-4">
				{/* Bus info */}
				<div className="flex items-center justify-between border-b pb-3">
					<span className="font-semibold text-sm">{busName}</span>
					<span className="text-muted-foreground text-xs">
						{selectedSeats.length} seat{selectedSeats.length > 1 ? "s" : ""}
					</span>
				</div>

				{/* Seats */}
				<div className="flex items-center gap-2 text-sm">
					<Armchair className="size-4 text-muted-foreground" />
					<span className="text-muted-foreground">Seats:</span>
					<span className="font-medium">{selectedSeats.join(", ")}</span>
				</div>

				{/* Boarding */}
				{boarding && (
					<div className="flex items-center gap-2 text-sm">
						<MapPin className="size-4 text-muted-foreground" />
						<span className="text-muted-foreground">Pickup:</span>
						<span className="font-medium">
							{boarding.name} ({boarding.time})
						</span>
					</div>
				)}

				{/* Dropping */}
				{dropping && (
					<div className="flex items-center gap-2 text-sm">
						<MapPinned className="size-4 text-muted-foreground" />
						<span className="text-muted-foreground">Drop:</span>
						<span className="font-medium">
							{dropping.name} ({dropping.time})
						</span>
					</div>
				)}

				{/* Passengers */}
				<div className="border-t pt-3">
					<span className="mb-2 block font-medium text-muted-foreground text-xs">
						Passengers
					</span>
					{passengers.map((p, i) => (
						<div
							className="flex items-center justify-between py-1 text-sm"
							key={p.seatId}
						>
							<span>{p.name || `Passenger ${i + 1}`}</span>
							<span className="text-muted-foreground text-xs">
								{p.age ? `${p.age} yrs` : ""} · {p.gender} · Seat {p.seatId}
							</span>
						</div>
					))}
				</div>

				{/* Total */}
				<div className="flex items-center justify-between border-t pt-3">
					<span className="font-bold text-base">Total Amount</span>
					<span className="font-bold text-lg text-primary">
						₹{totalPrice.toLocaleString()}
					</span>
				</div>
			</div>

			<Button className="cursor-pointer h-11 w-full rounded-xl bg-primary font-bold text-white shadow-lg hover:bg-primary/90">
				<CreditCard className="mr-2 size-4" />
				Proceed to Pay ₹{totalPrice.toLocaleString()}
			</Button>
		</div>
	);
}
