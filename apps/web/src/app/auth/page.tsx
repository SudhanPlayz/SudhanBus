import { AuthClient } from "./auth-client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default function AuthPage() {
	// Future server-side auth assertions/redirects can happen here before returning UI
	return <AuthClient />;
}
