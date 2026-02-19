import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const metadata = {
	title: "Contact Us | SudhanBus",
	description:
		"Get in touch with SudhanBus. Find our office location, phone number, email, and directions on Google Maps.",
};

export default function ContactPage() {
	return (
		<div className="flex flex-col">
			{/* Google Maps Embed */}
			<section className="w-full">
				<iframe
					allowFullScreen
					className="h-[350px] w-full md:h-[450px]"
					loading="lazy"
					referrerPolicy="no-referrer-when-downgrade"
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3946.2636509422596!2d77.99238927544135!3d8.473723791567117!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0389f91c804be3%3A0xcfd1bfc63e2b6ad3!2sSudhan%20Bus!5e0!3m2!1sen!2sin!4v1771505644410!5m2!1sen!2sin"
					style={{ border: 0 }}
					title="SudhanBus Office Location"
				/>
			</section>

			{/* Office Details */}
			<section className="mx-auto w-full max-w-3xl px-4 py-10 md:py-16">
				<div className="flex flex-col items-center text-center">
					<h1 className="font-bold text-2xl tracking-tight md:text-3xl">
						Get in Touch
					</h1>
					<p className="mt-2 max-w-lg text-muted-foreground text-sm md:text-base">
						We&apos;d love to hear from you. Whether you have a question about
						our services, need help with a booking, or just want to say hello —
						reach out to us.
					</p>

					<Separator className="my-8 max-w-xs" />

					{/* Address Card */}
					<div className="w-full max-w-md rounded-xl border bg-card p-6 shadow-sm">
						<div className="flex flex-col gap-5">
							<div className="flex items-start gap-3">
								<div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
									<MapPin className="size-5" />
								</div>
								<div className="text-left">
									<p className="font-semibold text-sm">Office Address</p>
									<p className="mt-0.5 text-muted-foreground text-sm">
										2/34A, Udangudi Road, Megnanapuram,
										<br />
										Tamil Nadu 628210
									</p>
								</div>
							</div>

							<div className="flex items-start gap-3">
								<div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
									<Phone className="size-5" />
								</div>
								<div className="text-left">
									<p className="font-semibold text-sm">Phone</p>
									<a
										className="mt-0.5 text-muted-foreground text-sm transition-colors hover:text-primary"
										href="tel:18001234567"
									>
										1800-123-4567
									</a>
								</div>
							</div>

							<div className="flex items-start gap-3">
								<div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
									<Mail className="size-5" />
								</div>
								<div className="text-left">
									<p className="font-semibold text-sm">Email</p>
									<a
										className="mt-0.5 text-muted-foreground text-sm transition-colors hover:text-primary"
										href="mailto:support@sudhanbus.com"
									>
										support@sudhanbus.com
									</a>
								</div>
							</div>

							<div className="flex items-start gap-3">
								<div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
									<Clock className="size-5" />
								</div>
								<div className="text-left">
									<p className="font-semibold text-sm">Working Hours</p>
									<p className="mt-0.5 text-muted-foreground text-sm">
										Mon – Sat: 9:00 AM – 6:00 PM
										<br />
										Sun: Closed
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
