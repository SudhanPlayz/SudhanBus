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

export function SignupForm({
	className,
	onSwitchToLogin,
	...props
}: Omit<React.ComponentProps<"div">, "ref"> & { onSwitchToLogin?: () => void }) {
	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<form className="flex flex-col gap-6">
				<FieldGroup>
					<div className="flex flex-col items-center gap-2 text-center">
						<h1 className="text-2xl font-bold">Create your account</h1>
						<p className="text-muted-foreground text-sm text-balance">
							Sign up to start booking buses on SudhanBus
						</p>
					</div>
					<Field>
						<FieldLabel htmlFor="signup-name">Full Name</FieldLabel>
						<Input
							id="signup-name"
							type="text"
							placeholder="John Doe"
							required
						/>
					</Field>
					<Field>
						<FieldLabel htmlFor="signup-email">Email</FieldLabel>
						<Input
							id="signup-email"
							type="email"
							placeholder="you@example.com"
							required
						/>
					</Field>
					<Field>
						<FieldLabel htmlFor="signup-phone">Phone Number</FieldLabel>
						<Input
							id="signup-phone"
							type="tel"
							placeholder="+91 98765 43210"
							required
						/>
					</Field>
					<Field>
						<div className="grid grid-cols-2 gap-4">
							<Field>
								<FieldLabel htmlFor="signup-password">Password</FieldLabel>
								<Input id="signup-password" type="password" required />
							</Field>
							<Field>
								<FieldLabel htmlFor="signup-confirm-password">
									Confirm
								</FieldLabel>
								<Input
									id="signup-confirm-password"
									type="password"
									required
								/>
							</Field>
						</div>
						<FieldDescription>
							Must be at least 8 characters long.
						</FieldDescription>
					</Field>
					<Field>
						<Button type="submit" className="w-full">
							Create Account
						</Button>
					</Field>
					<FieldDescription className="text-center text-sm">
						Already have an account?{" "}
						<button
							type="button"
							onClick={onSwitchToLogin}
							className="underline underline-offset-2 hover:text-foreground font-medium cursor-pointer"
						>
							Sign in
						</button>
					</FieldDescription>
				</FieldGroup>
			</form>
		</div>
	);
}
