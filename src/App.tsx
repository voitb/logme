// import OAuthSuccess from "./components/auth/OAuthSuccess";
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

	const showUserCard = () => {
		if (window.location.pathname === "/") {
			return (
				<div className="flex justify-end w-screen">
					<UserCard />
				</div>
			);
		}
	};
	const showVerificationCard = () => {
		if (window.location.pathname === "/verify") {
			return <VerificationCard />;
		}
	};
	const showVerificationAcceptCard = () => {
		if (window.location.pathname === "/verification-complete") {
			return <VerificationComplete />;
		}
	};
	const showLogging = () => {
		if (window.location.pathname === "/logging") {
			return <OAuthSuccess />;
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
				{showUserCard()}
				{showVerificationCard()}
				{showVerificationAcceptCard()}
				{showLogging()}
			</LoginHandler>
		</AuthProvider>
	);
}

export default App;
