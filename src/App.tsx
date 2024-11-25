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
	const showLoginPage = () => {
		if (window.location.pathname === "/login") {
			return <LoginPage />;
		}
	};

	const showRegister = () => {
		if (window.location.pathname === "/register") {
			return <RegisterPage />;
		}
	};

	const showLoginStatus = () => {
		if (window.location.pathname === "/status") {
			return <LoginStatus />;
		}
	};

	const showForgotPassword = () => {
		if (window.location.pathname === "/forgot-password") {
			return <ForgotPasswordPage />;
		}
	};

	const showResetPassword = () => {
		if (window.location.pathname === "/reset-password") {
			return <ResetPasswordPage />;
		}
	};

	return (
		<AuthProvider>
			<LoginHandler>
				{showLoginPage()}
				{showRegister()}
				{showLoginStatus()}
				{showResetPassword()}
				{showForgotPassword()}
			</LoginHandler>
		</AuthProvider>
	);
}

export default App;
