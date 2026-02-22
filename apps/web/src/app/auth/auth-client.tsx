"use client";

import { AnimatePresence, domAnimation, LazyMotion, m } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { LoginForm } from "@/components/auth/login-form";
import { SignupForm } from "@/components/auth/signup-form";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type AuthTab = "login" | "signup";

export function AuthClient() {
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
									className={cn(
										"flex-1 cursor-pointer rounded-md py-2 font-medium text-sm transition-all",
										activeTab === "login"
											? "bg-background text-foreground shadow-sm"
											: "text-muted-foreground hover:text-foreground"
									)}
									onClick={() => setActiveTab("login")}
									type="button"
								>
									Sign In
								</button>
								<button
									className={cn(
										"flex-1 cursor-pointer rounded-md py-2 font-medium text-sm transition-all",
										activeTab === "signup"
											? "bg-background text-foreground shadow-sm"
											: "text-muted-foreground hover:text-foreground"
									)}
									onClick={() => setActiveTab("signup")}
									type="button"
								>
									Sign Up
								</button>
							</div>

							{/* Form Content */}
							<LazyMotion features={domAnimation}>
								<AnimatePresence mode="wait">
									<m.div
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: -20 }}
										initial={{ opacity: 0, x: 20 }}
										key={activeTab}
										transition={{ duration: 0.2 }}
									>
										{activeTab === "login" ? (
											<LoginForm
												onSwitchToSignup={() => setActiveTab("signup")}
											/>
										) : (
											<SignupForm
												onSwitchToLogin={() => setActiveTab("login")}
											/>
										)}
									</m.div>
								</AnimatePresence>
							</LazyMotion>
						</div>

						{/* Image Side */}
						<div className="relative hidden bg-muted md:block">
							<div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
								<Image
									alt="SudhanBus logo"
									className="size-16"
									height={64}
									src="/logo.png"
									width={64}
								/>
								<h2 className="font-bold text-2xl tracking-tight">SudhanBus</h2>
								<p className="max-w-[280px] text-balance text-muted-foreground text-sm">
									Book bus tickets across India with ease. Safe, reliable, and
									affordable travel at your fingertips.
								</p>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Footer */}
				<p className="mt-4 px-6 text-center text-muted-foreground text-xs">
					By continuing, you agree to our{" "}
					<Link
						className="underline underline-offset-2 hover:text-foreground"
						href="/"
					>
						Terms of Service
					</Link>{" "}
					and{" "}
					<Link
						className="underline underline-offset-2 hover:text-foreground"
						href="/"
					>
						Privacy Policy
					</Link>
					.
				</p>
			</div>
		</div>
	);
}
