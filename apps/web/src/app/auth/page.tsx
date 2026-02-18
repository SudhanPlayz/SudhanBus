"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { LoginForm } from "@/components/auth/login-form";
import { SignupForm } from "@/components/auth/signup-form";

type AuthTab = "login" | "signup";

export default function AuthPage() {
	const [activeTab, setActiveTab] = useState<AuthTab>("login");

	return (
		<div className="flex min-h-[calc(100svh-theme(spacing.12)-1px)] items-center justify-center p-4 md:p-8">
			<div className="w-full max-w-4xl">
				<Card className="overflow-hidden p-0">
					<CardContent className="grid p-0 md:grid-cols-2">
						{/* Form Side */}
						<div className="p-6 md:p-8">
							{/* Tab Switcher */}
							<div className="mb-6 flex rounded-lg bg-muted p-1">
								<button
									type="button"
									onClick={() => setActiveTab("login")}
									className={cn(
										"flex-1 rounded-md py-2 text-sm font-medium transition-all cursor-pointer",
										activeTab === "login"
											? "bg-background text-foreground shadow-sm"
											: "text-muted-foreground hover:text-foreground",
									)}
								>
									Sign In
								</button>
								<button
									type="button"
									onClick={() => setActiveTab("signup")}
									className={cn(
										"flex-1 rounded-md py-2 text-sm font-medium transition-all cursor-pointer",
										activeTab === "signup"
											? "bg-background text-foreground shadow-sm"
											: "text-muted-foreground hover:text-foreground",
									)}
								>
									Sign Up
								</button>
							</div>

							{/* Form Content */}
							<AnimatePresence mode="wait">
								<motion.div
									key={activeTab}
									initial={{ opacity: 0, x: 20 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: -20 }}
									transition={{ duration: 0.2 }}
								>
									{activeTab === "login" ? (
										<LoginForm onSwitchToSignup={() => setActiveTab("signup")} />
									) : (
										<SignupForm onSwitchToLogin={() => setActiveTab("login")} />
									)}
								</motion.div>
							</AnimatePresence>
						</div>

						{/* Image Side */}
						<div className="bg-muted relative hidden md:block">
							<div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
								<Image
									alt="SudhanBus logo"
									className="size-16"
									height={64}
									src="/logo.png"
									width={64}
								/>
								<h2 className="text-2xl font-bold tracking-tight">
									SudhanBus
								</h2>
								<p className="text-muted-foreground text-sm text-balance max-w-[280px]">
									Book bus tickets across India with ease. Safe, reliable, and
									affordable travel at your fingertips.
								</p>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Footer */}
				<p className="mt-4 px-6 text-center text-xs text-muted-foreground">
					By continuing, you agree to our{" "}
					<a href="#" className="underline underline-offset-2 hover:text-foreground">
						Terms of Service
					</a>{" "}
					and{" "}
					<a href="#" className="underline underline-offset-2 hover:text-foreground">
						Privacy Policy
					</a>
					.
				</p>
			</div>
		</div>
	);
}
