import { ArrowRight, Clock, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import { POPULAR_ROUTES, type Route } from "./popular-routes-data";

function RouteItem({ route }: { route: Route }) {
	return (
		<div className="flex items-center justify-between rounded-lg border border-border px-4 py-3 transition-colors hover:bg-muted/50">
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
			<div className="flex items-center gap-4">
				<div className="text-right">
					<p className="font-semibold text-sm text-primary">₹{route.price}</p>
					<p className="text-muted-foreground text-xs">onwards</p>
				</div>
				<Button size="sm">Book Now</Button>
			</div>
		</div>
	);
}

function PopularRoutesSection() {
	return (
		<div className="flex w-full items-center justify-center px-4">
			<Card className="w-full max-w-6xl shadow-none">
				<CardHeader>
					<CardTitle className="font-semibold text-lg tracking-tight">
						Popular Routes
					</CardTitle>
				</CardHeader>
				<CardContent>
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
