import { TicketX } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";

export const metadata: Metadata = {
	title: "My Bookings – SudhanBus",
	description: "View and manage all your bus ticket bookings on SudhanBus.",
};

export default function MyBookingsPage() {
	return (
		<div className="mx-auto flex min-h-[calc(100svh-8rem)] max-w-5xl flex-col items-center justify-center px-4 py-12">
			<Empty className="min-h-[400px] w-full max-w-xl border p-12">
				<EmptyHeader className="gap-6">
					<EmptyMedia className="size-20 *:size-10" variant="icon">
						<TicketX />
					</EmptyMedia>
					<EmptyContent className="max-w-md gap-3">
						<EmptyTitle className="text-2xl">No bookings yet</EmptyTitle>
						<EmptyDescription className="text-base text-muted-foreground">
							You haven&apos;t booked any bus tickets yet. Start by searching
							for available routes and grab your seat!
						</EmptyDescription>
					</EmptyContent>
				</EmptyHeader>

				<Link className="mt-6" href="/">
					<Button
						className="cursor-pointer h-12 rounded-full px-8 text-lg"
						size="lg"
					>
						Book a Bus
					</Button>
				</Link>
			</Empty>
		</div>
	);
}
