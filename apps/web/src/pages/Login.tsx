import { lazy, Suspense, useState } from "react";
import Loader from "@/components/loader";

// Dynamically import form components
const SignInForm = lazy(() => import("@/components/sign-in-form"));
const SignUpForm = lazy(() => import("@/components/sign-up-form"));

export default function LoginPage() {
	const [showSignIn, setShowSignIn] = useState(false);

	return (
		<Suspense fallback={<Loader />}>
			{showSignIn ? (
				<SignInForm onSwitchToSignUp={() => setShowSignIn(false)} />
			) : (
				<SignUpForm onSwitchToSignIn={() => setShowSignIn(true)} />
			)}
		</Suspense>
	);
}
