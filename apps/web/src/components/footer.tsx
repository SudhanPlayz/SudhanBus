import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

const FAQ_ITEMS = [
	{
		value: "about",
		title: "About SudhanBus",
		content:
			"SudhanBus is a reliable bus ticket booking platform that connects travelers across India. We partner with top bus operators to offer comfortable, safe, and affordable travel options for every route.",
	},
	{
		value: "how-to-book",
		title: "How to book a ticket",
		content:
			"Booking is simple — select your origin and destination cities, pick a travel date, and hit Search. Browse available buses, choose your preferred seat, and complete the payment. Your e-ticket will be sent to your email instantly.",
	},
	{
		value: "cancellation",
		title: "Cancellation & Refund Policy",
		content:
			"Cancellations made 24 hours before departure are eligible for a full refund. Cancellations within 24 hours may attract a cancellation fee depending on the operator's policy. Refunds are processed within 5-7 business days.",
	},
	{
		value: "contact",
		title: "Contact Us",
		content:
			"Need help? Reach out to our support team at support@sudhanbus.com or call us at 1800-123-4567 (toll-free). Our team is available 24/7 to assist you with bookings, cancellations, and any queries.",
	},
] as const;

function Footer() {
	return (
		<footer className="border-t bg-muted/30">
			<div className="mx-auto max-w-3xl px-4 py-6">
				<h2 className="mb-3 font-medium text-sm">Frequently Asked Questions</h2>
				<Accordion>
					{FAQ_ITEMS.map((item) => (
						<AccordionItem key={item.value} value={item.value}>
							<AccordionTrigger>{item.title}</AccordionTrigger>
							<AccordionContent>
								<p>{item.content}</p>
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
				<Separator className="my-4" />
				<p className="text-center text-muted-foreground text-xs">
					&copy; {new Date().getFullYear()} SudhanBus. All rights reserved.
				</p>
			</div>
		</footer>
	);
}

export { Footer };
