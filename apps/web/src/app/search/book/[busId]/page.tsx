import { redirect } from "next/navigation";
import { Suspense } from "react";
import { DEMO_BUSES } from "@/components/search/bus-data";
import { BookingModal } from "@/components/search/modal/booking-modal";

export const runtime = "nodejs";

interface BookPageProps {
	params: Promise<{ busId: string }>;
}

export default async function BookPage({ params }: BookPageProps) {
	const { busId } = await params;
	const bus = DEMO_BUSES.find((b) => b.id === busId);

	if (!bus) {
		redirect("/");
	}

	return (
		<div className="flex min-h-svh items-center justify-center bg-zinc-100/50 dark:bg-zinc-900/50 p-4">
			<Suspense
				fallback={
					<div className="text-muted-foreground animate-pulse">
						Loading booking details...
					</div>
				}
			>
				<BookingModal bus={bus} />
			</Suspense>
		</div>
	);
}
