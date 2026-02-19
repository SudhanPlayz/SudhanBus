import { redirect } from "next/navigation";
import { DEMO_BUSES } from "@/components/search/bus-data";
import { BookingModal } from "@/components/search/modal/booking-modal";

interface ModalPageProps {
	params: Promise<{ busId: string }>;
}

export default async function BookingModalPage({ params }: ModalPageProps) {
	const { busId } = await params;
	const bus = DEMO_BUSES.find((b) => b.id === busId);

	if (!bus) {
		redirect("/search");
	}

	return <BookingModal bus={bus} />;
}
