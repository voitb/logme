import React, { createContext, useEffect, useState, useMemo } from "react";
import AuthManager from "@/core/auth/AuthManager";
import {
	User,
	ProfileDetails,
	AuthProvider as AuthProviderInterface,
} from "@/types";
import { AuthProviderFactory } from "../core/AuthProviderFactory";
import { useAuthMethods } from "../hooks/useAuthMethods";
import { OAuthProvider } from "appwrite";

interface AuthProviderProps {
	children: React.ReactNode;
	provider?: "appwrite" | "supabase" | "custom";
	customProvider?: AuthProviderInterface;
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
		navigate?: (path: string) => void;
	};
}

export type LoadingTypes = "manual" | OAuthProvider | null;

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
	forgotPassword: (email: string) => Promise<void>;
	sendResetPassword: (
		userId: string,
		secret: string,
		newPassword: string
	) => Promise<void>;
	updateProfile: (profileDetails: ProfileDetails) => Promise<void>;
	sendEmailVerification: () => Promise<void>;
	sendVerifyEmail: (userId: string, secret: string) => Promise<void>;
	getIsEmailVerified: () => Promise<boolean>;
	setSession(userId: string, secret: string): Promise<void>;
	fetchLoggedUser: () => Promise<void>;
	isLoadingUser: boolean;
	navigate?: (path: string) => void;
	loading: LoadingTypes;
	setLoading: (value: LoadingTypes) => void;
	updateAvatar(avatar: File): Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({
	children,
	provider = "appwrite",
	customProvider,
	methods = {},
}) => {
	const [user, setUser] = useState<User | null>(null);
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [isInitialized, setIsInitialized] = useState<boolean>(false);
	const [isLoadingUser, setIsLoadingUser] = useState<boolean>(false);
	const [loading, setLoading] = useState<LoadingTypes>(null);

	const authManager = useMemo(() => {
		let authProvider: AuthProviderInterface;

		if (provider === "custom") {
			if (!customProvider) {
				throw new Error(
					"Custom provider is required when provider is set to 'custom'"
				);
			}
			authProvider = customProvider;
		} else {
			authProvider = AuthProviderFactory.createAuthProvider(provider);
		}

		return new AuthManager(authProvider);
	}, [provider, customProvider]);

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
	} = useAuthMethods(methods);

	useEffect(() => {
		if (!authManager) return;

		const initializeAuth = async () => {
			await authManager.initialize();
		};

		const listener = (
			loggedIn: boolean,
			user: User | null,
			isInitialized: boolean
		) => {
			setIsInitialized(isInitialized);
			setIsLoadingUser(authManager.getIsLoading());
			setIsLoggedIn(loggedIn);
			setUser(user);
		};

		authManager.subscribe(listener);

		initializeAuth();
		return () => {
			authManager.unsubscribe(listener);
		};
	}, [authManager]);

	const login = async (email: string, password: string) => {
		try {
			await authManager.login(email, password);
			const user = authManager.getUser()!;
			onLoginSuccess && onLoginSuccess(user);
		} catch (error) {
			onLoginError && onLoginError(error as Error);
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
			onRegisterSuccess && onRegisterSuccess();
		} catch (error) {
			onRegisterError && onRegisterError(error as Error);
			throw error;
		}
	};

	const logout = async () => {
		await authManager.logout();
		onLogout && onLogout();
	};

	const forgotPassword = async (email: string) => {
		try {
			await authManager.forgotPassword(email);
			// Handle success if needed
		} catch (error) {
			// Handle error if needed
			throw error;
		}
	};

	const sendResetPassword = async (
		userId: string,
		secret: string,
		newPassword: string
	) => {
		try {
			await authManager.sendResetPassword(userId, secret, newPassword);
			// Handle success if needed
		} catch (error) {
			// Handle error if needed
			throw error;
		}
	};

	const updateProfile = async (profileDetails: ProfileDetails) => {
		try {
			await authManager.updateProfile(profileDetails);
			onUpdateProfileSuccess && onUpdateProfileSuccess();
		} catch (error) {
			onUpdateProfileError && onUpdateProfileError(error as Error);
			throw error;
		}
	};

	const sendEmailVerification = async () => {
		try {
			await authManager.sendEmailVerification();
			onSendEmailVerificationSuccess && onSendEmailVerificationSuccess();
		} catch (error) {
			onSendEmailVerificationError &&
				onSendEmailVerificationError(error as Error);
			throw error;
		}
	};

	const getIsEmailVerified = async (): Promise<boolean> => {
		return authManager.getIsEmailVerified();
	};

	const sendVerifyEmail = async (userId: string, secret: string) => {
		try {
			await authManager.sendConfirmVerification(userId, secret);
			// Handle success if needed
		} catch (error) {
			// Handle error if needed
			throw error;
		}
	};

	const setSession = async (userId: string, secret: string) => {
		await authManager.setSession(userId, secret);
	};

	const fetchLoggedUser = async () => {
		await authManager.fetchLoggedUser();
	};

	const updateAvatar = async (avatar: File) => {
		await authManager.updateAvatar(avatar);
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
				updateProfile,
				sendEmailVerification,
				getIsEmailVerified,
				forgotPassword,
				sendVerifyEmail,
				setSession,
				fetchLoggedUser,
				isLoadingUser,
				sendResetPassword,
				navigate: methods.navigate,
				loading,
				setLoading,
				updateAvatar,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
