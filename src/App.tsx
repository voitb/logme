// App.tsx
import React from "react";
import OAuthSuccess from "./components/auth/OAuthSuccess";
import UserCard from "./components/auth/UserCard";
import VerificationCard from "./components/auth/VerificationCard";
import VerificationComplete from "./components/auth/VerificationComplete";
import LoginHandler from "./components/layout/LoginHandler";
import {
	AuthProvider,
	LoginPage,
	LoginStatus,
	RegisterPage,
	ForgotPasswordPage,
	ResetPasswordPage,
} from "./index";
import "./index.css";

function App() {
	const renderComponent = () => {
		const path = window.location.pathname;

		switch (path) {
			case "/login":
				return <LoginPage />;
			case "/register":
				return <RegisterPage />;
			case "/status":
				return <LoginStatus />;
			case "/forgot-password":
				return <ForgotPasswordPage />;
			case "/reset-password":
				return <ResetPasswordPage />;
			case "/verify":
				return <VerificationCard />;
			case "/verification-complete":
				return <VerificationComplete />;
			case "/logging":
				return <OAuthSuccess />;
			case "/":
				return (
					<div className="flex justify-end w-screen">
						<UserCard />
					</div>
				);
			default:
				return <div>404 Not Found</div>;
		}
	};

	return (
		<AuthProvider>
			<LoginHandler>{renderComponent()}</LoginHandler>
		</AuthProvider>
	);
}

export default App;
