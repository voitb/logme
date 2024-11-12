import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

const LoginStatus: React.FC = () => {
	const { isLoggedIn, user, logout } = useAuth();

	if (!isLoggedIn) {
		return <p className="text-gray-500">Nie jesteś zalogowany</p>;
	}

	return (
		<div className="flex items-center space-x-4">
			<p className="text-gray-700">Zalogowany jako {user?.name}</p>
			<Button variant="outline" onClick={logout}>
				Wyloguj
			</Button>
		</div>
	);
};

export default LoginStatus;
