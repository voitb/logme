import React from "react";
import { useAuth } from "../../hooks/useAuth";

interface LoginHandlerProps {
	children: React.ReactNode;
}

const LoginHandler = ({ children }: LoginHandlerProps) => {
	const { isLoggedIn, isInitialized, user } = useAuth();

	// Ścieżki, które nie wymagają logowania
	const publicPaths = [
		"/reset-password",
		"/forgot-password",
		"/register",
		"/login",
	];

	// Ścieżki związane z weryfikacją
	const verificationPaths = ["/verify", "/verification-complete"];

	// Poczekaj na pełną inicjalizację
	if (!isInitialized) {
		return null;
	}

	// Jeśli użytkownik nie jest zalogowany i znajduje się poza publiczną ścieżką, przekieruj na login
	if (!isLoggedIn && !publicPaths.includes(window.location.pathname)) {
		window.location.href = "/login";
		return null;
	}

	// Jeśli użytkownik jest zalogowany, ale jego e-mail nie jest zweryfikowany
	if (isLoggedIn && user && !user.emailVerification) {
		if (!verificationPaths.includes(window.location.pathname)) {
			// Przekieruj na stronę weryfikacji
			window.location.href = "/verify";
			return null;
		}
	}

	// Jeśli użytkownik jest zweryfikowany i przebywa na stronie weryfikacji, przekieruj na główną stronę
	if (
		isLoggedIn &&
		user &&
		user.emailVerification &&
		verificationPaths.includes(window.location.pathname)
	) {
		window.location.href = "/";
		return null;
	}

	// Jeśli użytkownik jest zalogowany i na publicznej ścieżce, przekieruj na główną stronę
	if (isLoggedIn && publicPaths.includes(window.location.pathname)) {
		window.location.href = "/";
		return null;
	}

	// Renderuj dzieci komponentu, gdy wszystkie warunki są spełnione
	return <>{children}</>;
};

export default LoginHandler;
