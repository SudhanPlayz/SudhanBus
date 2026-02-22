"use client";

import {
	Armchair,
	CreditCard,
	MapPin,
	MapPinned,
	Tag,
	Ticket,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BOARDING_POINTS, DROPPING_POINTS } from "./seat-data";
import type { PassengerInfo } from "./step-passenger-info";

interface StepPaymentProps {
	appliedOffer: { code: string; discount: number } | null;
	boardingPoint: string | null;
	busName: string;
	droppingPoint: string | null;
	onApplyPromo: (code: string) => boolean;
	onRemovePromo: () => void;
	passengers: PassengerInfo[];
	selectedSeats: string[];
	setIsOffersOpen: (open: boolean) => void;
	totalPrice: number;
}

export function StepPayment({
	selectedSeats,
	totalPrice,
	boardingPoint,
	droppingPoint,
	passengers,
	busName,
	appliedOffer,
	onApplyPromo,
	onRemovePromo,
	setIsOffersOpen,
}: StepPaymentProps) {
	const boarding = BOARDING_POINTS.find((b) => b.id === boardingPoint);
	const dropping = DROPPING_POINTS.find((d) => d.id === droppingPoint);

	const [promoInput, setPromoInput] = useState("");
	const [promoError, setPromoError] = useState("");

	const handleApplyPromo = (code: string) => {
		const success = onApplyPromo(code);
		if (success) {
			setPromoError("");
			setPromoInput("");
		} else {
			setPromoError("Invalid promo code");
		}
	};

	const removePromo = () => {
		onRemovePromo();
		setPromoInput("");
		setPromoError("");
	};

	const finalPrice = appliedOffer
		? totalPrice - appliedOffer.discount
		: totalPrice;

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

				{/* Promo Code Section */}
				<div className="border-t pt-3">
					<div className="flex items-center justify-between space-x-2">
						<div className="flex-1 relative">
							<Ticket className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
							<Input
								className="pl-9 h-9"
								onChange={(e) => {
									setPromoInput(e.target.value);
									if (promoError) setPromoError("");
								}}
								placeholder="Enter promo code"
								value={promoInput}
							/>
						</div>
						<Button
							className="h-9 bg-red-500 text-white hover:bg-red-600 disabled:bg-red-500/50"
							disabled={!promoInput}
							onClick={() => handleApplyPromo(promoInput)}
							size="sm"
						>
							Apply
						</Button>
						<Button
							className="h-9 px-2"
							onClick={() => setIsOffersOpen(true)}
							size="sm"
							variant="outline"
						>
							<Tag className="size-4 mr-1 text-primary" />
							Offers
						</Button>
					</div>
					{promoError && (
						<p className="text-xs text-destructive mt-1">{promoError}</p>
					)}

					{appliedOffer && (
						<div className="flex items-center justify-between mt-3 p-2 bg-green-50 rounded-lg text-sm border border-green-100">
							<div className="flex items-center text-green-700">
								<Tag className="size-4 mr-1.5" />
								<span className="font-semibold">
									{appliedOffer.code} APPLIED
								</span>
							</div>
							<div className="flex items-center gap-2">
								<span className="text-green-700 font-medium">
									-₹{appliedOffer.discount.toLocaleString()}
								</span>
								<button
									className="text-muted-foreground hover:text-foreground text-xs underline cursor-pointer"
									onClick={removePromo}
									type="button"
								>
									Remove
								</button>
							</div>
						</div>
					)}
				</div>

				{/* Total */}
				<div className="flex items-center justify-between border-t pt-3">
					<span className="font-bold text-base">Total Amount</span>
					<div className="text-right">
						{appliedOffer && (
							<div className="text-sm text-muted-foreground line-through mr-2 inline-block">
								₹{totalPrice.toLocaleString()}
							</div>
						)}
						<span className="font-bold text-lg text-primary">
							₹{finalPrice.toLocaleString()}
						</span>
					</div>
				</div>
			</div>

			<Button className="cursor-pointer h-11 w-full rounded-xl bg-primary font-bold text-white shadow-lg hover:bg-primary/90">
				<CreditCard className="mr-2 size-4" />
				Proceed to Pay ₹{finalPrice.toLocaleString()}
			</Button>
		</div>
	);
}
