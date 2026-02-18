"use client";

import { MenuIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth-client";

interface MobileAuthSectionProps {
	onClose: () => void;
	onNavigate: (href: string) => void;
}

function MobileAuthSection({ onNavigate, onClose }: MobileAuthSectionProps) {
	const router = useRouter();
	const { data: session, isPending } = authClient.useSession();

	if (isPending) {
		return (
			<div className="px-4">
				<Skeleton className="h-9 w-full" />
			</div>
		);
	}

	if (!session) {
		return (
			<div className="px-4">
				<SheetClose
					onClick={() => onNavigate("/auth")}
					render={<Button className="w-full" variant="outline" />}
				>
					Sign In
				</SheetClose>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-2 px-4">
			<p className="px-3 font-medium text-sm">{session.user.name}</p>
			<p className="px-3 text-muted-foreground text-xs">{session.user.email}</p>
			<Button
				className="w-full justify-start"
				onClick={() => {
					authClient.signOut({
						fetchOptions: {
							onSuccess: () => {
								onClose();
								router.push("/");
							},
						},
					});
				}}
				variant="destructive"
			>
				Sign Out
			</Button>
		</div>
	);
}

function MobileNav() {
	const [open, setOpen] = useState(false);
	const router = useRouter();

	const handleNavigation = (href: string) => {
		setOpen(false);
		router.push(href as "/");
	};

	return (
		<Sheet onOpenChange={setOpen} open={open}>
			<Button
				aria-label="Open menu"
				onClick={() => setOpen(true)}
				size="icon-sm"
				variant="ghost"
			>
				<MenuIcon className="size-5" />
			</Button>

			<SheetContent side="right">
				<SheetHeader>
					<SheetTitle>
						<SheetClose
							onClick={() => handleNavigation("/")}
							render={
								<button className="flex items-center gap-2" type="button" />
							}
						>
							<Image
								alt="SudhanBus logo"
								className="size-7"
								height={28}
								src="/logo.png"
								width={28}
							/>
							<span className="font-semibold text-sm tracking-tight">
								SudhanBus
							</span>
						</SheetClose>
					</SheetTitle>
				</SheetHeader>

				<Separator />

				<nav className="flex flex-col gap-1 px-4">
					<SheetClose
						className="w-full rounded-md px-3 py-2 text-left font-medium text-sm transition-colors hover:bg-accent"
						onClick={() => handleNavigation("/")}
						render={<button type="button" />}
					>
						Home
					</SheetClose>
					<SheetClose
						className="w-full rounded-md px-3 py-2 text-left font-medium text-sm transition-colors hover:bg-accent"
						onClick={() => handleNavigation("/bookings")}
						render={<button type="button" />}
					>
						My Bookings
					</SheetClose>
				</nav>

				<Separator />

				<MobileAuthSection
					onClose={() => setOpen(false)}
					onNavigate={handleNavigation}
				/>
			</SheetContent>
		</Sheet>
	);
}

export { MobileNav };
