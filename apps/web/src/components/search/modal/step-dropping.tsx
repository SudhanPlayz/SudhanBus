"use client";

import { MapPinned } from "lucide-react";
import { cn } from "@/lib/utils";
import { DROPPING_POINTS } from "./seat-data";

interface StepDroppingProps {
	selected: string | null;
	onSelect: (id: string) => void;
}

export function StepDropping({ selected, onSelect }: StepDroppingProps) {
	return (
		<div className="space-y-3">
			<div>
				<h3 className="font-semibold text-base">Select Dropping Point</h3>
				<p className="text-muted-foreground text-sm">Choose your drop-off location</p>
			</div>
			<div className="space-y-2">
				{DROPPING_POINTS.map((point) => (
					<button
						className={cn(
							"flex w-full items-start gap-3 rounded-xl border-2 p-3 text-left transition-all",
							selected === point.id
								? "border-primary bg-primary/5 shadow-sm"
								: "border-border hover:border-primary/30 hover:bg-muted/50"
						)}
						key={point.id}
						onClick={() => onSelect(point.id)}
						type="button"
					>
						<div
							className={cn(
								"mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full",
								selected === point.id
									? "bg-primary text-primary-foreground"
									: "bg-muted text-muted-foreground"
							)}
						>
							<MapPinned className="size-4" />
						</div>
						<div className="min-w-0 flex-1">
							<div className="flex items-center justify-between">
								<span className="font-medium text-sm">{point.name}</span>
								<span className="font-semibold text-sm text-primary">{point.time}</span>
							</div>
							<p className="mt-0.5 truncate text-muted-foreground text-xs">{point.address}</p>
						</div>
					</button>
				))}
			</div>
		</div>
	);
}
