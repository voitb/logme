// src/react/contexts/AuthContext.tsx
import React, { createContext, useEffect, useState } from "react";
import AuthManager from "@/core/AuthManager";
import { User } from "@/core/types";

interface AuthProviderProps {
	children: React.ReactNode;
	apiEndpoint: string;
	onLoginSuccess?: (user: User) => void;
	onLoginError?: (error: Error) => void;
}

export interface AuthContextType {
	user: User | null;
	isLoggedIn: boolean;
	login: (username: string, password: string) => Promise<void>;
	logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({
	children,
	apiEndpoint,
	onLoginSuccess,
	onLoginError,
}) => {
	const [user, setUser] = useState<User | null>(null);
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

	useEffect(() => {
		AuthManager.getInstance(apiEndpoint);
		const listener = (loggedIn: boolean, user: User | null) => {
			setIsLoggedIn(loggedIn);
			setUser(user);
		};
		AuthManager.getInstance().subscribe(listener);
		return () => {
			AuthManager.getInstance().unsubscribe(listener);
		};
	}, [apiEndpoint]);

	const login = async (username: string, password: string) => {
		try {
			await AuthManager.getInstance().login(username, password);
			if (onLoginSuccess) {
				onLoginSuccess(AuthManager.getInstance().getUser()!);
			}
		} catch (error) {
			if (onLoginError) {
				onLoginError(error as Error);
			}
			throw error;
		}
	};

	const logout = () => {
		AuthManager.getInstance().logout();
	};

	return (
		<AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
