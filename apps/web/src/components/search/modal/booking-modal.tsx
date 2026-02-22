"use client";

import { useBookingStore } from "@sudhanbus/zustand/stores/booking";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import { AnimatePresence, domAnimation, LazyMotion, m } from "motion/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogDescription,
	DialogOverlay,
	DialogPortal,
	DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Stepper,
	StepperIndicator,
	StepperItem,
	StepperNav,
	StepperSeparator,
	StepperTitle,
	StepperTrigger,
} from "@/components/ui/stepper";

import type { Bus } from "../bus-data";
import { generateDemoSeatLayout } from "./seat-data";
import { SeatLayout } from "./seat-layout";
import { StepBoarding } from "./step-boarding";
import { StepDropping } from "./step-dropping";
import { type PassengerInfo, StepPassengerInfo } from "./step-passenger-info";
import { StepPayment } from "./step-payment";
import { StepReview } from "./step-review";

const STEPS = [
	{ label: "Select Seats", step: 1 },
	{ label: "Boarding", step: 2 },
	{ label: "Dropping", step: 3 },
	{ label: "Passengers", step: 4 },
	{ label: "Review", step: 5 },
	{ label: "Payment", step: 6 },
];

interface BookingModalProps {
	bus: Bus;
}

export function BookingModal({ bus }: BookingModalProps) {
	const router = useRouter();
	const [activeStep, setActiveStep] = useState(1);
	const [direction, setDirection] = useState(1); // 1 = forward, -1 = back
	const {
		selectedSeats,
		seatPrices,
		boardingPoint,
		droppingPoint,
		passengers,
		toggleSeat: handleSeatToggle,
		setBoardingPoint,
		setDroppingPoint,
		setPassengers,
		setBus,
		resetBooking,
		busId,
	} = useBookingStore();

	// If this modal opens for a DIFFERENT bus, reset the booking state to start fresh
	const [hasAutoResumed, setHasAutoResumed] = useState(false);

	useEffect(() => {
		if (busId && busId !== bus.id) {
			resetBooking();
			setBus(bus.id, bus);
			setHasAutoResumed(true);
		} else if (busId === bus.id && !hasAutoResumed) {
			// Auto-resume to the furthest valid step
			let step = 1;
			if (selectedSeats.length > 0) step = 2;
			if (step === 2 && boardingPoint !== null) step = 3;
			if (step === 3 && droppingPoint !== null) step = 4;
			if (step === 4 && passengers.every((p) => p.name.trim() && p.age))
				step = 5;

			setActiveStep(step);
			setHasAutoResumed(true);
		} else if (!busId) {
			setBus(bus.id, bus);
			setHasAutoResumed(true);
		}
	}, [
		bus.id,
		busId,
		resetBooking,
		setBus,
		hasAutoResumed,
		selectedSeats.length,
		boardingPoint,
		droppingPoint,
		passengers,
	]);

	const decks = useMemo(() => generateDemoSeatLayout(), []);

	const totalPrice = useMemo(
		() => selectedSeats.reduce((sum, id) => sum + (seatPrices[id] || 0), 0),
		[selectedSeats, seatPrices]
	);

	const handleNext = () => {
		setDirection(1);
		setActiveStep((prev) => Math.min(prev + 1, 6));
	};

	const handleBack = () => {
		setDirection(-1);
		setActiveStep((prev) => Math.max(prev - 1, 1));
	};

	const handleClose = () => {
		router.back();
	};

	const isStepValid = (step: number) => {
		switch (step) {
			case 1:
				return selectedSeats.length > 0;
			case 2:
				return boardingPoint !== null;
			case 3:
				return droppingPoint !== null;
			case 4:
				return passengers.every((p) => p.name.trim() && p.age);
			default:
				return true;
		}
	};

	const canGoToStep = (target: number) => {
		// Always allow going back
		if (target <= activeStep) {
			return true;
		}
		// For going forward, all steps before target must be valid
		for (let s = 1; s < target; s++) {
			if (!isStepValid(s)) {
				return false;
			}
		}
		return true;
	};

	const slideVariants = {
		enter: (dir: number) => ({
			x: dir > 0 ? 80 : -80,
			opacity: 0,
		}),
		center: {
			x: 0,
			opacity: 1,
		},
		exit: (dir: number) => ({
			x: dir > 0 ? -80 : 80,
			opacity: 0,
		}),
	};

	return (
		<Dialog
			onOpenChange={(open) => {
				if (!open) {
					handleClose();
				}
			}}
			open
		>
			<DialogPortal>
				<DialogOverlay />
				<div
					className="fixed inset-0 z-50 flex items-center justify-center p-4"
					onClick={handleClose}
					onKeyDown={(e) => {
						if (e.key === "Escape") {
							handleClose();
						}
					}}
					role="presentation"
				>
					<div
						className="relative flex h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-background shadow-2xl ring-1 ring-foreground/10"
						onClick={(e) => e.stopPropagation()}
						onKeyDown={(e) => e.stopPropagation()}
						role="dialog"
					>
						{/* Header */}
						<div className="flex items-center justify-between border-b px-5 py-3">
							<div className="flex items-center gap-3">
								{activeStep > 1 && (
									<button
										className="flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
										onClick={handleBack}
										type="button"
									>
										<ArrowLeft className="size-4" />
									</button>
								)}
								<div>
									<DialogTitle className="font-bold text-base">
										{bus.name}
									</DialogTitle>
									<DialogDescription className="text-muted-foreground text-xs">
										{bus.type} · {bus.departureTime} → {bus.arrivalTime}
									</DialogDescription>
								</div>
							</div>
							<div className="flex items-center gap-3">
								{selectedSeats.length > 0 && (
									<div className="rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary text-xs">
										{selectedSeats.length} seat
										{selectedSeats.length > 1 ? "s" : ""} · ₹
										{totalPrice.toLocaleString()}
									</div>
								)}
								<button
									className="flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
									onClick={handleClose}
									type="button"
								>
									<X className="size-4" />
								</button>
							</div>
						</div>

						{/* Stepper Nav */}
						<div className="border-b px-5 py-3">
							<Stepper
								onValueChange={(v) => {
									if (!canGoToStep(v)) {
										return;
									}
									setDirection(v > activeStep ? 1 : -1);
									setActiveStep(v);
								}}
								value={activeStep}
							>
								<StepperNav>
									{STEPS.map(({ label, step }) => (
										<StepperItem
											completed={step < activeStep}
											key={step}
											step={step}
										>
											<StepperTrigger className="flex items-center gap-2">
												<StepperIndicator>
													{step < activeStep ? (
														<Check className="size-3" />
													) : (
														<span className="text-[10px]">{step}</span>
													)}
												</StepperIndicator>
												<StepperTitle className="hidden sm:block">
													{label}
												</StepperTitle>
											</StepperTrigger>
											{step < STEPS.length && <StepperSeparator />}
										</StepperItem>
									))}
								</StepperNav>
							</Stepper>
						</div>

						<ScrollArea className="min-h-0 flex-1">
							<div className="p-5">
								<LazyMotion features={domAnimation}>
									<AnimatePresence custom={direction} mode="wait">
										<m.div
											animate="center"
											custom={direction}
											exit="exit"
											initial="enter"
											key={activeStep}
											transition={{ duration: 0.25, ease: "easeInOut" }}
											variants={slideVariants}
										>
											{activeStep === 1 && (
												<SeatLayout
													decks={decks}
													onSeatToggle={handleSeatToggle}
													selectedSeats={selectedSeats}
												/>
											)}
											{activeStep === 2 && (
												<StepBoarding
													onSelect={setBoardingPoint}
													selected={boardingPoint}
												/>
											)}
											{activeStep === 3 && (
												<StepDropping
													onSelect={setDroppingPoint}
													selected={droppingPoint}
												/>
											)}
											{activeStep === 4 && (
												<StepPassengerInfo
													onPassengerChange={setPassengers}
													passengers={passengers}
													selectedSeats={selectedSeats}
												/>
											)}
											{activeStep === 5 && (
												<StepReview
													boardingPoint={boardingPoint}
													busName={bus.name}
													droppingPoint={droppingPoint}
													onEditStep={(s) => {
														setDirection(-1);
														setActiveStep(s);
													}}
													passengers={passengers}
													selectedSeats={selectedSeats}
													totalPrice={totalPrice}
												/>
											)}
											{activeStep === 6 && (
												<StepPayment
													boardingPoint={boardingPoint}
													busName={bus.name}
													droppingPoint={droppingPoint}
													passengers={passengers}
													selectedSeats={selectedSeats}
													totalPrice={totalPrice}
												/>
											)}
										</m.div>
									</AnimatePresence>
								</LazyMotion>
							</div>
						</ScrollArea>

						{/* Footer */}
						{activeStep < 6 && (
							<div className="flex items-center justify-end border-t px-5 py-3">
								<Button
									className="rounded-full bg-primary font-semibold text-white shadow-md hover:bg-primary/90"
									disabled={!isStepValid(activeStep)}
									onClick={handleNext}
								>
									Continue
									<ArrowRight className="ml-1.5 size-4" />
								</Button>
							</div>
						)}
					</div>
				</div>
			</DialogPortal>
		</Dialog>
	);
}
