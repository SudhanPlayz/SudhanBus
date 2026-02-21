import {
	BadgeCheck,
	Headphones,
	Heart,
	ShieldCheck,
	Smartphone,
	Target,
	Users,
	Zap,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const FEATURES = [
	{
		icon: BadgeCheck,
		title: "Verified Operators",
		description:
			"Every bus operator on our platform is thoroughly verified to ensure reliability and safety.",
	},
	{
		icon: Zap,
		title: "Instant Booking",
		description:
			"Book your seat in seconds and receive instant confirmation — no waiting, no hassle.",
	},
	{
		icon: ShieldCheck,
		title: "No Hidden Charges",
		description:
			"The price you see is the price you pay. We believe in full transparency with our customers.",
	},
	{
		icon: Smartphone,
		title: "Mobile-Friendly",
		description:
			"Our platform is optimized for mobile devices so you can book anytime, anywhere.",
	},
	{
		icon: Headphones,
		title: "Customer Support",
		description:
			"Our dedicated support team is always ready to assist you before, during, and after your journey.",
	},
	{
		icon: Heart,
		title: "Comfort First",
		description:
			"We work closely with operators to ensure every journey meets our comfort and quality standards.",
	},
];

export function AboutSection() {
	return (
		<section id="about" className="mx-auto w-full max-w-6xl px-4 py-10 md:py-16 scroll-mt-20">
			{/* Hero */}
			<div className="flex flex-col items-center text-center">
				<h2 className="font-bold text-3xl tracking-tight md:text-4xl">
					About SudhanBus
				</h2>
				<p className="mt-4 max-w-2xl text-muted-foreground md:text-lg">
					We&apos;re building a simple and reliable way to book bus tickets
					across cities — fast search, transparent prices, and trusted
					operators, all in one place.
				</p>
			</div>

			<Separator className="my-10" />

			{/* Our Story */}
			<div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-12">
				<div className="flex shrink-0 items-center justify-center">
					<div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
						<Target className="size-8" />
					</div>
				</div>
				<div>
					<h3 className="font-semibold text-xl md:text-2xl">Our Mission</h3>
					<p className="mt-3 text-muted-foreground leading-relaxed">
						Booking bus tickets shouldn&apos;t be confusing or stressful. Our
						goal is to remove friction from bus travel by offering a clean,
						easy-to-use platform that puts passengers first. We believe that
						everyone deserves access to safe, comfortable, and affordable
						transportation — and that&apos;s exactly what we&apos;re working to
						deliver every single day.
					</p>
				</div>
			</div>

			<div className="mt-10 flex flex-col gap-6 md:flex-row md:items-start md:gap-12">
				<div className="flex shrink-0 items-center justify-center">
					<div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
						<Users className="size-8" />
					</div>
				</div>
				<div>
					<h3 className="font-semibold text-xl md:text-2xl">Who We Are</h3>
					<p className="mt-3 text-muted-foreground leading-relaxed">
						We are a passionate team dedicated to transforming the bus travel
						experience in India. We work closely with trusted operators to
						ensure safe, comfortable, and dependable journeys. Every trip listed
						on our platform meets our quality standards — because your trust
						matters to us.
					</p>
				</div>
			</div>

			<Separator className="my-10" />

			{/* Why Choose Us */}
			<div>
				<h3 className="mb-8 text-center font-semibold text-xl md:text-2xl">
					Why Choose Us?
				</h3>
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{FEATURES.map((feature) => (
						<div
							className="group flex flex-col items-center rounded-xl border bg-card p-6 text-center shadow-sm transition-shadow hover:shadow-md"
							key={feature.title}
						>
							<div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
								<feature.icon className="size-6" />
							</div>
							<h4 className="font-semibold text-sm">{feature.title}</h4>
							<p className="mt-2 text-muted-foreground text-xs leading-relaxed">
								{feature.description}
							</p>
						</div>
					))}
				</div>
			</div>

			<Separator className="my-10" />

			{/* CTA */}
			<div className="flex flex-col items-center text-center">
				<p className="max-w-xl text-lg text-muted-foreground leading-relaxed">
					Our mission is to make bus travel{" "}
					<span className="font-semibold text-foreground">accessible</span>,{" "}
					<span className="font-semibold text-foreground">affordable</span>, and{" "}
					<span className="font-semibold text-foreground">stress-free</span> for
					everyone.
				</p>
			</div>
		</section>
	);
}
