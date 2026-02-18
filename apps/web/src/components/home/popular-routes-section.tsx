import { ArrowRight, Clock, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

import { POPULAR_ROUTES, type Route } from "./popular-routes-data";

function RouteItem({ route }: { route: Route }) {
	return (
		<div className="flex flex-col gap-3 rounded-lg border border-border px-4 py-3 transition-colors hover:bg-muted/50 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
			{/* Route info */}
			<div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-6">
				<div className="flex items-center gap-2 font-medium text-sm">
					<span>{route.from}</span>
					<ArrowRight className="size-3.5 text-muted-foreground" />
					<span>{route.to}</span>
				</div>
				<div className="flex items-center gap-3 text-muted-foreground text-xs">
					<span className="flex items-center gap-1">
						<MapPin className="size-3" />
						{route.distance}
					</span>
					<span className="flex items-center gap-1">
						<Clock className="size-3" />
						{route.duration}
					</span>
				</div>
			</div>

			{/* Price and Action */}
			<div className="flex items-center justify-between gap-4 sm:justify-end">
				<div className="text-left sm:text-right">
					<p className="font-semibold text-primary text-sm">₹{route.price}</p>
					<p className="text-muted-foreground text-xs">onwards</p>
				</div>
				<InteractiveHoverButton className="w-full py-1.5 text-xs sm:w-32">
					Book Now
				</InteractiveHoverButton>
			</div>
		</div>
	);
}

function PopularRoutesSection() {
	return (
		<div className="flex w-full items-center justify-center px-2 md:px-4">
			<Card className="w-full max-w-4xl shadow-none">
				<CardHeader className="px-4 md:px-6">
					<CardTitle className="font-semibold text-lg tracking-tight">
						Popular Routes
					</CardTitle>
				</CardHeader>
				<CardContent className="px-4 md:px-6">
					<div className="flex flex-col gap-2">
						{POPULAR_ROUTES.map((route) => (
							<RouteItem key={route.id} route={route} />
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

export { PopularRoutesSection };
