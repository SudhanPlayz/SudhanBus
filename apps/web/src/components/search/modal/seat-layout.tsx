"use client";

import { cn } from "@/lib/utils";
import type { DeckLayout, Seat, SeatStatus } from "./seat-data";

interface SeatLayoutProps {
	decks: DeckLayout[];
	selectedSeats: string[];
	onSeatToggle: (seatId: string, price: number) => void;
}

function SteeringWheel() {
	return (
		<div className="flex items-center justify-end pr-2 pb-2">
			<svg
				className="size-8 text-muted-foreground/60"
				fill="none"
				stroke="currentColor"
				strokeWidth={1.5}
				viewBox="0 0 24 24"
			>
				<circle cx="12" cy="12" r="9" />
				<circle cx="12" cy="12" r="2" />
				<path d="M12 5v5M7.5 16l3.5-4M16.5 16l-3.5-4" />
			</svg>
		</div>
	);
}

function getSeatStyles(status: SeatStatus, isSelected: boolean, type: "seater" | "sleeper") {
	const base = "relative flex flex-col items-center justify-center rounded-lg border-2 transition-all cursor-default";
	const size = type === "sleeper" ? "h-16 w-10" : "h-10 w-10";

	if (isSelected) {
		return cn(base, size, "border-emerald-600 bg-emerald-600 text-white cursor-pointer shadow-md shadow-emerald-200");
	}

	switch (status) {
		case "available":
			return cn(base, size, "border-emerald-500 bg-white hover:bg-emerald-50 cursor-pointer");
		case "available-female":
			return cn(base, size, "border-pink-400 bg-white hover:bg-pink-50 cursor-pointer");
		case "booked":
			return cn(base, size, "border-gray-200 bg-gray-100 text-gray-400");
		case "booked-female":
			return cn(base, size, "border-gray-200 bg-pink-50 text-pink-300");
		case "booked-male":
			return cn(base, size, "border-gray-200 bg-blue-50 text-blue-300");
		case "selected":
			return cn(base, size, "border-emerald-600 bg-emerald-600 text-white shadow-md shadow-emerald-200");
		default:
			return cn(base, size, "border-gray-200 bg-gray-100");
	}
}

function SeatIcon({ status, type }: { status: SeatStatus; type: "seater" | "sleeper" }) {
	if (status === "booked-female" || status === "available-female") {
		return (
			<svg className="size-3.5" fill="currentColor" viewBox="0 0 24 24">
				<path d="M12 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 10c-4 0-8 2-8 4v2h16v-2c0-2-4-4-8-4z" />
			</svg>
		);
	}
	if (status === "booked-male") {
		return (
			<svg className="size-3.5" fill="currentColor" viewBox="0 0 24 24">
				<path d="M12 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 10c-4 0-8 2-8 4v2h16v-2c0-2-4-4-8-4z" />
			</svg>
		);
	}
	if (status === "booked") {
		return (
			<svg className="size-3.5" fill="currentColor" viewBox="0 0 24 24">
				<path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
			</svg>
		);
	}
	// Available seats get a small seat icon
	if (type === "seater") {
		return (
			<svg className="size-4 text-emerald-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
				<rect height="8" rx="1" width="10" x="7" y="6" />
				<path d="M7 14v4M17 14v4M9 18h6" />
			</svg>
		);
	}
	return null;
}

function SeatCell({
	seat,
	isSelected,
	onToggle,
}: {
	seat: Seat;
	isSelected: boolean;
	onToggle: (seatId: string, price: number) => void;
}) {
	const isClickable =
		seat.status === "available" || seat.status === "available-female" || isSelected;

	const handleClick = () => {
		if (isClickable) {
			onToggle(seat.id, seat.price);
		}
	};

	const isBooked = seat.status === "booked" || seat.status === "booked-female" || seat.status === "booked-male";

	return (
		<div className="flex flex-col items-center gap-1">
			<button
				className={getSeatStyles(seat.status, isSelected, seat.type)}
				disabled={!isClickable}
				onClick={handleClick}
				type="button"
			>
				{isSelected ? (
					<svg className="size-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
						<path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				) : (
					<SeatIcon status={seat.status} type={seat.type} />
				)}
				{/* Bottom bar for available sleeper */}
				{seat.type === "sleeper" && !isBooked && !isSelected && (
					<div className="absolute bottom-1.5 h-0.5 w-5 rounded-full bg-emerald-400" />
				)}
				{seat.type === "sleeper" && isSelected && (
					<div className="absolute bottom-1.5 h-0.5 w-5 rounded-full bg-white/60" />
				)}
			</button>
			<span className={cn("text-[10px] font-semibold", isBooked ? "text-muted-foreground" : "text-foreground")}>
				{isBooked ? "Sold" : `₹${seat.price.toLocaleString()}`}
			</span>
		</div>
	);
}

function DeckSection({
	deck,
	selectedSeats,
	onSeatToggle,
	showSteering = false,
}: {
	deck: DeckLayout;
	selectedSeats: string[];
	onSeatToggle: (seatId: string, price: number) => void;
	showSteering?: boolean;
}) {
	return (
		<div className="flex-1 rounded-xl bg-gray-50 p-3">
			<div className="mb-3 flex items-center justify-between">
				<h4 className="font-semibold text-sm">{deck.name}</h4>
				{showSteering && <SteeringWheel />}
			</div>
			<div className="flex flex-col gap-3">
				{deck.seats.map((row, rowIdx) => (
					<div className="flex items-end justify-center gap-2" key={rowIdx}>
						{row.map((seat, colIdx) => {
							if (!seat) {
								return <div className="w-10" key={`empty-${colIdx}`} />;
							}
							return (
								<SeatCell
									isSelected={selectedSeats.includes(seat.id)}
									key={seat.id}
									onToggle={onSeatToggle}
									seat={seat}
								/>
							);
						})}
					</div>
				))}
			</div>
		</div>
	);
}

function SeatLegend() {
	return (
		<div className="mt-4 rounded-xl bg-gray-50 p-3">
			<h4 className="mb-2 font-semibold text-xs">Seat Legend</h4>
			<div className="grid grid-cols-2 gap-x-6 gap-y-2 text-[11px] sm:grid-cols-3">
				<div className="flex items-center gap-2">
					<div className="size-5 rounded border-2 border-emerald-500 bg-white" />
					<span>Available</span>
				</div>
				<div className="flex items-center gap-2">
					<div className="size-5 rounded border-2 border-emerald-600 bg-emerald-600" />
					<span>Selected by you</span>
				</div>
				<div className="flex items-center gap-2">
					<div className="size-5 rounded border-2 border-gray-200 bg-gray-100" />
					<span>Already booked</span>
				</div>
				<div className="flex items-center gap-2">
					<div className="size-5 rounded border-2 border-pink-400 bg-white" />
					<span>Available (Female)</span>
				</div>
				<div className="flex items-center gap-2">
					<div className="size-5 rounded border-2 border-gray-200 bg-pink-50" />
					<span>Booked (Female)</span>
				</div>
				<div className="flex items-center gap-2">
					<div className="size-5 rounded border-2 border-gray-200 bg-blue-50" />
					<span>Booked (Male)</span>
				</div>
			</div>
		</div>
	);
}

export function SeatLayout({ decks, selectedSeats, onSeatToggle }: SeatLayoutProps) {
	return (
		<div className="space-y-3">
			<div className="flex flex-col gap-3 sm:flex-row">
				{decks.map((deck, i) => (
					<DeckSection
						deck={deck}
						key={deck.name}
						onSeatToggle={onSeatToggle}
						selectedSeats={selectedSeats}
						showSteering={i === 0}
					/>
				))}
			</div>
			<SeatLegend />
		</div>
	);
}
