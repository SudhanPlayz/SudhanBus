import { Clock, Mail, MapPin, Phone } from "lucide-react";

export function ContactSection() {
	return (
		<section id="contact" className="w-full mx-auto max-w-6xl px-4 py-10 md:py-16 scroll-mt-20">
            <div className="flex flex-col items-center text-center pb-10">
                <h2 className="font-bold text-3xl tracking-tight md:text-4xl">
                    Get in Touch
                </h2>
                <p className="mt-4 max-w-2xl text-muted-foreground md:text-lg">
                    We&apos;d love to hear from you. Whether you have a question about
                    our services, need help with a booking, or just want to say hello —
                    reach out to us.
                </p>
            </div>
            
            <div className="grid gap-8 lg:grid-cols-2 mt-6">
                {/* Office Details */}
                <div className="rounded-xl border bg-card shadow-sm h-full flex flex-col justify-center">
                    <div className="flex flex-col gap-6 p-6 sm:p-8">
                        <div className="flex items-start gap-4">
                            <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <MapPin className="size-6" />
                            </div>
                            <div className="text-left mt-1">
                                <p className="font-semibold text-base">Office Address</p>
                                <p className="mt-1 text-muted-foreground text-sm">
                                    2/34A, Udangudi Road, Megnanapuram,
                                    <br />
                                    Tamil Nadu 628210
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <Phone className="size-6" />
                            </div>
                            <div className="text-left mt-1">
                                <p className="font-semibold text-base">Phone</p>
                                <a
                                    className="mt-1 text-muted-foreground text-sm transition-colors hover:text-primary"
                                    href="tel:18001234567"
                                >
                                    1800-123-4567
                                </a>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <Mail className="size-6" />
                            </div>
                            <div className="text-left mt-1">
                                <p className="font-semibold text-base">Email</p>
                                <a
                                    className="mt-1 text-muted-foreground text-sm transition-colors hover:text-primary"
                                    href="mailto:support@sudhanbus.com"
                                >
                                    support@sudhanbus.com
                                </a>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <Clock className="size-6" />
                            </div>
                            <div className="text-left mt-1">
                                <p className="font-semibold text-base">Working Hours</p>
                                <p className="mt-1 text-muted-foreground text-sm">
                                    Mon – Sat: 9:00 AM – 6:00 PM
                                    <br />
                                    Sun: Closed
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Google Maps Embed */}
                <div className="w-full h-full min-h-[400px] rounded-xl overflow-hidden border shadow-sm">
                    <iframe
                        allowFullScreen
                        className="h-full w-full"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3946.2636509422596!2d77.99238927544135!3d8.473723791567117!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0389f91c804be3%3A0xcfd1bfc63e2b6ad3!2sSudhan%20Bus!5e0!3m2!1sen!2sin!4v1771505644410!5m2!1sen!2sin"
                        style={{ border: 0 }}
                        title="SudhanBus Office Location"
                    />
                </div>
            </div>
		</section>
	);
}
