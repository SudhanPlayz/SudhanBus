"use client";

import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";

export const DEMO_OFFERS = [
	{
		code: "SUMMER20",
		description: "Get 20% off up to ₹150",
		type: "percentage",
		value: 20,
		maxDiscount: 150,
	},
	{
		code: "FESTIVE50",
		description: "Flat ₹50 off on all bookings",
		type: "flat",
		value: 50,
	},
];

interface OffersSheetProps {
	appliedCode: string | null;
	onApply: (code: string) => void;
	onOpenChange: (open: boolean) => void;
	open: boolean;
}

export function OffersSheet({
	open,
	appliedCode,
	onOpenChange,
	onApply,
}: OffersSheetProps) {
	return (
		<Sheet modal={false} onOpenChange={onOpenChange} open={open}>
			<SheetContent
				className="absolute right-0 top-0 h-full w-[380px] border-l"
				onClick={(e) => e.stopPropagation()}
				onKeyDown={(e) => e.stopPropagation()}
				onPointerDown={(e) => e.stopPropagation()}
				side="right"
			>
				<SheetHeader className="px-6 pt-6 mb-2">
					<SheetTitle>Available Offers</SheetTitle>
					<SheetDescription>
						Select a promo code to apply to your booking.
					</SheetDescription>
				</SheetHeader>
				<div className="flex flex-col gap-4 overflow-y-auto px-6 pb-6">
					{DEMO_OFFERS.map((offer) => {
						const isApplied = offer.code === appliedCode;
						return (
							<div
								className="border rounded-xl p-4 flex flex-col gap-2 relative overflow-hidden group"
								key={offer.code}
							>
								<div className="flex items-center justify-between">
									<div className="font-bold text-primary border-2 border-dashed border-primary/40 bg-primary/5 px-2 py-0.5 rounded uppercase tracking-wider text-sm">
										{offer.code}
									</div>
									<Button
										className="bg-red-500 text-white hover:bg-red-600 disabled:bg-red-500/50"
										disabled={isApplied}
										onClick={() => onApply(offer.code)}
										size="sm"
									>
										{isApplied ? "Applied" : "Apply"}
									</Button>
								</div>
								<p className="text-sm text-foreground">{offer.description}</p>
							</div>
						);
					})}
				</div>
			</SheetContent>
		</Sheet>
	);
}
