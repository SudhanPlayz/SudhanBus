import {
	Accordion,
	AccordionItem,
	AccordionPanel,
	AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ_ITEMS = [
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
] as const;

function FAQSection() {
	return (
		<section id="faq" className="w-full max-w-6xl mx-auto px-4 pb-6 md:pb-10 scroll-mt-20">
			<h2 className="mb-6 text-2xl font-bold tracking-tight md:text-3xl text-center">
				Frequently Asked Questions
			</h2>
			<div className="mx-auto max-w-3xl">
				<Accordion className="w-full">
					{FAQ_ITEMS.map((item) => (
						<AccordionItem key={item.value} value={item.value}>
							<AccordionTrigger className="text-base font-semibold">{item.title}</AccordionTrigger>
							<AccordionPanel>
								<p className="text-muted-foreground text-start">{item.content}</p>
							</AccordionPanel>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</section>
	);
}

export { FAQSection };
