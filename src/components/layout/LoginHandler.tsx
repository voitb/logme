// LoginHandler.tsx
import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { Loader } from "lucide-react";

interface LoginHandlerProps {
	children: React.ReactNode;
}

const LoginHandler = ({ children }: LoginHandlerProps) => {
	const { isLoggedIn, isInitialized, user } = useAuth();

	const publicPaths = [
		"/logging",
		"/reset-password",
		"/forgot-password",
		"/register",
		"/login",
	];

	const verificationPaths = ["/verify", "/verification-complete", "/logging"];

	if (!isInitialized) {
		return (
			<div className="h-screen w-screen flex items-center justify-center p-4">
				<Loader className="w-8 h-8 animate-spin text-gray-500 dark:text-gray-400" />
			</div>
		);
	}

	if (!isLoggedIn && !publicPaths.includes(window.location.pathname)) {
		window.location.href = "/login";
	}

	if (isLoggedIn && user && !user.emailVerification) {
		if (!verificationPaths.includes(window.location.pathname)) {
			window.location.href = "/verify";
		}
	}

	if (
		isLoggedIn &&
		user &&
		user.emailVerification &&
		verificationPaths.includes(window.location.pathname)
	) {
		window.location.href = "/";
	}

	if (isLoggedIn && publicPaths.includes(window.location.pathname)) {
		window.location.href = "/";
	}

	return children;
};

export default LoginHandler;
