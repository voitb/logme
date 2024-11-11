import { AuthProvider, LoginPage, LoginStatus } from "./index";
import "./index.css";

function App() {
	return (
		<AuthProvider apiEndpoint="https://api.twoja-domena.com">
			<div className="max-w-md mx-auto mt-10 space-y-6">
				<h1 className="text-2xl font-bold text-center">Demo Biblioteki</h1>
				<LoginStatus />
				<LoginPage />
			</div>
		</AuthProvider>
	);
}

export default App;
