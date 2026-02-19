"use client";

import { Button } from "@/components/ui/button";
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function LoginForm({
	className,
	onSwitchToSignup,
	...props
}: Omit<React.ComponentProps<"div">, "ref"> & {
	onSwitchToSignup?: () => void;
}) {
	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<form className="flex flex-col gap-6">
				<FieldGroup>
					<div className="flex flex-col items-center gap-2 text-center">
						<h1 className="font-bold text-2xl">Welcome back</h1>
						<p className="text-balance text-muted-foreground text-sm">
							Sign in to your SudhanBus account
						</p>
					</div>
					<Field>
						<FieldLabel htmlFor="login-email">Email</FieldLabel>
						<Input
							id="login-email"
							placeholder="you@example.com"
							required
							type="email"
						/>
					</Field>
					<Field>
						<div className="flex items-center">
							<FieldLabel htmlFor="login-password">Password</FieldLabel>
							<button
								className="ml-auto text-muted-foreground text-sm underline-offset-2 hover:underline"
								type="button"
							>
								Forgot password?
							</button>
						</div>
						<Input id="login-password" required type="password" />
					</Field>
					<Field>
						<Button className="w-full" type="submit">
							Sign In
						</Button>
					</Field>
					<FieldDescription className="text-center text-sm">
						Don&apos;t have an account?{" "}
						<button
							className="cursor-pointer font-medium underline underline-offset-2 hover:text-foreground"
							onClick={onSwitchToSignup}
							type="button"
						>
							Create one
						</button>
					</FieldDescription>
				</FieldGroup>
			</form>
		</div>
	);
}
