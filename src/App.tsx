import { AuthProvider, LoginPage, LoginStatus, RegisterPage } from "./index";
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

	return (
		<AuthProvider apiEndpoint="https://api.twoja-domena.com">
			{showLoginPage()}
			{showRegister()}
			{showLoginStatus()}
		</AuthProvider>
	);
}

export default App;
