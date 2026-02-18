"use client";

import Image from "next/image";
import Link from "next/link";

import { MobileNav } from "./mobile-nav";
import UserMenu from "./user-menu";

export default function Header() {
	return (
		<header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="mx-auto flex h-12 max-w-5xl items-center justify-between px-4">
				<Link className="flex items-center gap-2" href="/">
					<Image
						alt="SudhanBus logo"
						className="size-7"
						height={28}
						priority
						src="/logo.png"
						width={28}
					/>
					<span className="max-w-[180px] truncate font-semibold text-sm tracking-tight sm:max-w-none">
						SudhanBus
					</span>
				</Link>

				{/* Desktop nav — hidden below md */}
				<div className="hidden items-center gap-3 md:flex">
					<Link
						className="font-medium text-muted-foreground text-xs transition-colors hover:text-foreground"
						href={"/bookings" as "/"}
					>
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
