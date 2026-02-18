"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function LoginForm({
	className,
	onSwitchToSignup,
	...props
}: Omit<React.ComponentProps<"div">, "ref"> & { onSwitchToSignup?: () => void }) {
	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<form className="flex flex-col gap-6">
				<FieldGroup>
					<div className="flex flex-col items-center gap-2 text-center">
						<h1 className="text-2xl font-bold">Welcome back</h1>
						<p className="text-muted-foreground text-sm text-balance">
							Sign in to your SudhanBus account
						</p>
					</div>
					<Field>
						<FieldLabel htmlFor="login-email">Email</FieldLabel>
						<Input
							id="login-email"
							type="email"
							placeholder="you@example.com"
							required
						/>
					</Field>
					<Field>
						<div className="flex items-center">
							<FieldLabel htmlFor="login-password">Password</FieldLabel>
							<a
								href="#"
								className="ml-auto text-sm underline-offset-2 hover:underline text-muted-foreground"
							>
								Forgot password?
							</a>
						</div>
						<Input id="login-password" type="password" required />
					</Field>
					<Field>
						<Button type="submit" className="w-full">
							Sign In
						</Button>
					</Field>
					<FieldDescription className="text-center text-sm">
						Don&apos;t have an account?{" "}
						<button
							type="button"
							onClick={onSwitchToSignup}
							className="underline underline-offset-2 hover:text-foreground font-medium cursor-pointer"
						>
							Create one
						</button>
					</FieldDescription>
				</FieldGroup>
			</form>
		</div>
	);
}
