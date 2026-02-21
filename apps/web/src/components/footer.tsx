import { Download, Monitor } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function Footer() {
	return (
		<footer className="bg-black text-white py-12 md:py-16">
			<div className="mx-auto max-w-6xl px-4 text-center sm:text-left">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-12">
					<div className="flex flex-col gap-6 items-center sm:items-start">
						<div className="flex items-center gap-3">
							<Image
								src="/logo.png"
								alt="SudhanBus Logo"
								width={32}
								height={32}
								className="rounded-lg"
							/>
							<span className="font-bold text-xl tracking-widest uppercase">
								SudhanBus
							</span>
						</div>
					</div>

					<div className="flex flex-col gap-4 items-center sm:items-start">
						<Link
							className="text-zinc-400 transition-colors hover:text-white text-sm"
							href={"/about" as any}
						>
							About Us
						</Link>
					</div>

					<div className="flex flex-col gap-4 items-center sm:items-start">
						<Link
							className="text-zinc-400 transition-colors hover:text-white text-sm"
							href={"/contact" as any}
						>
							Contact Us
						</Link>
						<a
							className="text-zinc-400 transition-colors hover:text-white text-sm"
							href="mailto:support@sudhanbus.com"
						>
							support@sudhanbus.com
						</a>
					</div>

					<div className="flex flex-col gap-4 items-center sm:items-start md:items-end">
						<Link
							className="text-zinc-400 transition-colors hover:text-white text-sm"
							href={"/privacy" as any}
						>
							Privacy Policy
						</Link>
						<Link
							className="text-zinc-400 transition-colors hover:text-white text-sm"
							href={"/terms" as any}
						>
							Terms & Conditions
						</Link>
					</div>
				</div>

				<div className="mt-12 flex flex-col md:flex-row gap-4 items-center justify-center">
					<Link
						href="#"
						className={cn(
							buttonVariants({ size: "lg", variant: "default" }),
							"w-full sm:w-64 bg-white text-black hover:bg-zinc-100 justify-center h-14 font-semibold text-base gap-3 rounded-xl transition-all hover:scale-[1.02]"
						)}
					>
						<Download className="size-5" />
						Download App
					</Link>
					<Link
						href={"/login" as any}
						className={cn(
							buttonVariants({ size: "lg", variant: "outline" }),
							"w-full sm:w-64 bg-zinc-900 border-zinc-800 text-white hover:bg-zinc-800 hover:text-white justify-center h-14 font-semibold text-base gap-3 rounded-xl transition-all hover:scale-[1.02]"
						)}
					>
						<Monitor className="size-5" />
						Web Login
					</Link>
				</div>

				<div className="mt-16 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-center gap-6">
					<p className="text-zinc-500 text-xs">
						&copy; {new Date().getFullYear()} SudhanBus Inc. All rights reserved.
					</p>
					<p className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">
						BUILT FOR SEEMLESS BOOKINGS
					</p>
				</div>
			</div>
		</footer>
	);
}

export { Footer };
