"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "./ui/sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<TooltipProvider openDelay={0}>
			{children}
			<Toaster richColors />
		</TooltipProvider>
	);
}
