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
			<Empty className="border">
				<EmptyHeader>
					<EmptyMedia variant="icon">
						<TicketX />
					</EmptyMedia>
					<EmptyContent>
						<EmptyTitle>No bookings yet</EmptyTitle>
						<EmptyDescription>
							You haven&apos;t booked any bus tickets yet. Start by searching
							for available routes and grab your seat!
						</EmptyDescription>
					</EmptyContent>
				</EmptyHeader>

				<Link href="/">
					<Button>Book a Bus</Button>
				</Link>
			</Empty>
		</div>
	);
}
