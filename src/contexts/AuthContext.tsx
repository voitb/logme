// AuthContext.tsx
import React, { createContext, useEffect, useState, useMemo } from "react";
import AuthManager from "@/core/auth/AuthManager";
import { User, ProfileDetails } from "@/types";
import { AuthProviderFactory } from "../core/AuthProviderFactory";
import { useAuthMethods } from "../hooks/useAuthMethods";
interface AuthProviderProps {
	children: React.ReactNode;
	provider?: "appwrite" | "supabase" | "custom";
	methods?: {
		onLoginSuccess?: (user: User) => void;
		onLoginError?: (error: Error) => void;
		onRegisterSuccess?: () => void;
		onRegisterError?: (error: Error) => void;
		onLogout?: () => void;
		onResetPasswordSuccess?: () => void;
		onResetPasswordError?: (error: Error) => void;
		onUpdateProfileSuccess?: () => void;
		onUpdateProfileError?: (error: Error) => void;
		onSendEmailVerificationSuccess?: () => void;
		onSendEmailVerificationError?: (error: Error) => void;
	};
}

export interface AuthContextType {
	user: User | null;
	isInitialized: boolean;
	provider: "appwrite" | "supabase" | "custom";
	isLoggedIn: boolean;
	login: (email: string, password: string) => Promise<void>;
	register: (
		email: string,
		password: string,
		username?: string
	) => Promise<void>;
	logout: () => Promise<void>;
	resetPassword: (password: string) => Promise<void>;
	forgotPassword: (email: string) => Promise<void>;
	updateProfile: (profileDetails: ProfileDetails) => Promise<void>;
	sendEmailVerification: () => Promise<void>;
	sendVerifyEmail: (userId: string, secret: string) => Promise<void>;
	isEmailVerified: () => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({
	children,
	provider = "appwrite",
	methods = {},
}) => {
	const [user, setUser] = useState<User | null>(null);
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [isInitialized, setIsInitialized] = useState<boolean>(false);

	const authManager = useMemo(() => {
		const authProvider = AuthProviderFactory.createAuthProvider(provider);
		return new AuthManager(authProvider);
	}, [provider]);

	const {
		onLoginSuccess,
		onLoginError,
		onRegisterSuccess,
		onRegisterError,
		onLogout,
		onResetPasswordSuccess,
		onResetPasswordError,
		onUpdateProfileSuccess,
		onUpdateProfileError,
		onSendEmailVerificationSuccess,
		onSendEmailVerificationError,
		onForgotPasswordSuccess,
		onForgotPasswordError,
		onSendConfirmVerificationSuccess,
		onSendConfirmVerificationError,
	} = useAuthMethods(methods);
	useEffect(() => {
		const listener = (
			loggedIn: boolean,
			user: User | null,
			isInitialized: boolean
		) => {
			if (!loggedIn) window.location.reload();
			setIsInitialized(isInitialized);
			setIsLoggedIn(loggedIn);
			setUser(user);
		};
		authManager.subscribe(listener);
		setIsLoggedIn(authManager.isUserLoggedIn());
		setUser(authManager.getUser());
		setIsInitialized(authManager.getInitialized());
		return () => {
			authManager.unsubscribe(listener);
		};
	}, [authManager]);

	const login = async (email: string, password: string) => {
		try {
			await authManager.login(email, password);
			const user = authManager.getUser()!;
			onLoginSuccess(user);
		} catch (error) {
			onLoginError(error as Error);
			throw error;
		}
	};

	const register = async (
		email: string,
		password: string,
		username?: string
	) => {
		try {
			await authManager.register({ email, password, username });
			onRegisterSuccess();
		} catch (error) {
			onRegisterError(error as Error);
			throw error;
		}
	};

	const logout = async () => {
		await authManager.logout();
		onLogout();
	};

	const resetPassword = async (email: string) => {
		try {
			await authManager.resetPassword(email);
			onResetPasswordSuccess();
		} catch (error) {
			onResetPasswordError(error as Error);
			throw error;
		}
	};
	const forgotPassword = async (email: string) => {
		try {
			await authManager.forgotPassword(email);
			onForgotPasswordSuccess();
		} catch (error) {
			onForgotPasswordError(error as Error);
			throw error;
		}
	};

	const updateProfile = async (profileDetails: ProfileDetails) => {
		try {
			await authManager.updateProfile(profileDetails);
			onUpdateProfileSuccess();
		} catch (error) {
			onUpdateProfileError(error as Error);
			throw error;
		}
	};

	const sendEmailVerification = async () => {
		try {
			await authManager.sendEmailVerification();
			onSendEmailVerificationSuccess();
		} catch (error) {
			onSendEmailVerificationError(error as Error);
			throw error;
		}
	};

	const isEmailVerified = async (): Promise<boolean> => {
		return authManager.isEmailVerified();
	};

	const sendVerifyEmail = async (userId: string, secret: string) => {
		try {
			await authManager.sendConfirmVerification(userId, secret);
			onSendConfirmVerificationSuccess();
		} catch (error) {
			onSendConfirmVerificationError(error as Error);
			throw error;
		}
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				isLoggedIn,
				isInitialized,
				login,
				logout,
				register,
				provider,
				resetPassword,
				updateProfile,
				sendEmailVerification,
				isEmailVerified,
				forgotPassword,
				sendVerifyEmail,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
