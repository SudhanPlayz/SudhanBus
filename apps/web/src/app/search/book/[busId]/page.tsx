import { redirect } from "next/navigation";
import { DEMO_BUSES } from "@/components/search/bus-data";
import { BookingModal } from "@/components/search/modal/booking-modal";

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
		<div className="flex min-h-svh items-center justify-center bg-gray-100/50 p-4">
			<BookingModal bus={bus} />
		</div>
	);
}
