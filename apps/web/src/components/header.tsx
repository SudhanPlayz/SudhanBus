"use client";

import Image from "next/image";
import Link from "next/link";
import { Ticket } from "lucide-react";

import { buttonVariants } from "./ui/button";
import { MobileNav } from "./mobile-nav";
import UserMenu from "./user-menu";

export default function Header() {
	return (
		<header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
				<Link className="flex items-center gap-2" href="/">
					<Image
						alt="SudhanBus logo"
						className="size-9"
						height={36}
						priority
						src="/logo.png"
						width={36}
					/>
					<span className="max-w-[180px] truncate font-bold text-lg tracking-tight sm:max-w-none">
						SudhanBus
					</span>
				</Link>

				{/* Desktop nav — hidden below md */}
				<div className="hidden items-center gap-3 md:flex">
					<Link
						className={buttonVariants({
							variant: "ghost",
							className: "text-base text-muted-foreground hover:text-foreground",
						})}
						href={"/bookings" as "/"}
					>
						<Ticket className="mr-2 size-5" />
						My Bookings
					</Link>
					<UserMenu />
				</div>

				{/* Mobile nav — visible below md only */}
				<div className="block md:hidden">
					<MobileNav />
				</div>
			</div>
		</header>
	);
}
