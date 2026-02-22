import {
	Accordion,
	AccordionItem,
	AccordionPanel,
	AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQSection() {
	return (
		<div
			className="mx-auto w-full max-w-5xl scroll-mt-20 pb-6 md:pb-10 pt-12 md:pt-16"
			id="faq"
		>
			<div className="mx-4 grid grid-cols-1 md:mx-0 md:grid-cols-2 gap-8 md:gap-12">
				<div className="space-y-4 px-4 pt-4 md:pt-0">
					<h2 className="font-black text-3xl md:text-4xl">
						Frequently Asked Questions
					</h2>
					<p className="text-muted-foreground">
						Here are some common questions and answers you might have about
						booking your tickets with us.
					</p>
				</div>
				<div className="mt-4 md:mt-0">
					<Accordion defaultValue={["how-to-book"]}>
						{FAQ_ITEMS.map((item) => (
							<AccordionItem
								className="first:border-t last:border-b data-[state=open]:bg-card"
								key={item.value}
								value={item.value}
							>
								<AccordionTrigger className="px-4 py-4 text-[15px] leading-6 hover:no-underline">
									{item.title}
								</AccordionTrigger>
								<AccordionPanel className="px-4 pb-4 text-muted-foreground">
									{item.content}
								</AccordionPanel>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</div>
			<div className="flex h-14 items-center justify-center">
				<p className="text-muted-foreground">
					Can't find what you're looking for?{" "}
					<a className="text-primary hover:underline" href="#">
						Contact Us
					</a>
				</p>
			</div>
		</div>
	);
}

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
