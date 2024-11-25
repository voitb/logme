import React from "react";
import { useAuth } from "../../hooks/useAuth";

interface LoginHandlerProps {
	children: React.ReactNode;
}

const LoginHandler = ({ children }: LoginHandlerProps) => {
	const { isLoggedIn } = useAuth();

	const redirectPaths = ["/forgot-password", "/register", "/login"];

	if (isLoggedIn && redirectPaths.includes(window.location.pathname)) {
		window.location.href = "/";
	}
	return children;
};

export default LoginHandler;
