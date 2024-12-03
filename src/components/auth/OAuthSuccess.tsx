// OAuthSuccess.tsx
import React, { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Loader } from "lucide-react";
import useNavigationHandler from "../../hooks/useNavigationHandler";

const OAuthSuccess = () => {
	const { setSession } = useAuth();
	const navigate = useNavigationHandler();

	useEffect(() => {
		const getAccount = async () => {
			const params = new URLSearchParams(window.location.search);
			const userId = params.get("userId");
			const secret = params.get("secret");

			if (!userId || !secret) {
				console.error("Missing userId or secret in URL");
				navigate("/error");
				return;
			}

			try {
				await setSession(userId, secret);
				navigate("/");
			} catch (error) {
				console.error("Error setting session:", error);
				navigate("/error");
			}
		};

		getAccount();
	}, []);

	return (
		<div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100 dark:bg-gray-900">
			<div className="flex items-center justify-center p-4">
				<Loader className="w-8 h-8 animate-spin text-gray-500 dark:text-gray-400" />
			</div>
			<p className="mt-4 text-sm font-medium text-gray-600 dark:text-gray-300">
				Logging you in...
			</p>
		</div>
	);
};

export default OAuthSuccess;
