import React, { createContext, useEffect, useState, useMemo } from "react";
import AuthManager from "@/core/auth/AuthManager";
import {
	User,
	ProfileDetails,
	AuthProvider as AuthProviderInterface,
	AppwriteRawUser,
} from "@/types";
import { AuthProviderFactory } from "../core/AuthProviderFactory";
// import { useAuthMethods } from "../hooks/useAuthMethods";
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
	fetchLoggedUser: () => Promise<AppwriteRawUser>;
	isLoadingUser: boolean;
	navigate?: (path: string) => void;
	loading: LoadingTypes;
	setLoading: (value: LoadingTypes) => void;
	showConfirmation: boolean;
	setShowConfirmation: (value: boolean) => void;
	updateAvatar(avatar: File): Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({
	children,
	provider = "supabase",
	customProvider,
	methods = {},
}) => {
	const [user, setUser] = useState<User | null>(null);
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [isInitialized, setIsInitialized] = useState<boolean>(false);
	const [isLoadingUser, setIsLoadingUser] = useState<boolean>(false);
	const [loading, setLoading] = useState<LoadingTypes>(null);
	const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

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

	// const {
	// 	onLoginSuccess,
	// 	onLoginError,
	// 	onRegisterSuccess,
	// 	onRegisterError,
	// 	onLogout,
	// 	onResetPasswordSuccess,
	// 	onResetPasswordError,
	// 	onUpdateProfileSuccess,
	// 	onUpdateProfileError,
	// 	onSendEmailVerificationSuccess,
	// 	onSendEmailVerificationError,
	// } = useAuthMethods(methods);

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
		await authManager.login(email, password);
		// const user = authManager.getUser()!;
	};

	const register = async (
		email: string,
		password: string,
		username?: string
	) => {
		await authManager.register({ email, password, username });
	};

	const logout = async () => {
		await authManager.logout();
	};

	const forgotPassword = async (email: string) => {
		await authManager.forgotPassword(email);
	};

	const sendResetPassword = async (
		userId: string,
		secret: string,
		newPassword: string
	) => {
		await authManager.sendResetPassword(userId, secret, newPassword);
	};

	const sendEmailVerification = async () => {
		await authManager.sendEmailVerification();
	};

	const getIsEmailVerified = async (): Promise<boolean> => {
		return authManager.getIsEmailVerified();
	};

	const sendVerifyEmail = async (userId: string, secret: string) => {
		await authManager.sendConfirmVerification(userId, secret);
	};

	const setSession = async (userId: string, secret: string) => {
		await authManager.setSession(userId, secret);
	};

	const fetchLoggedUser = async () => {
		const user = await authManager.fetchLoggedUser();
		return user;
	};

	const updateAvatar = async (avatar: File) => {
		await authManager.updateAvatar(avatar);
	};

	const updateProfile = async (profileDetails: ProfileDetails) => {
		await authManager.updateProfile(profileDetails);
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
				showConfirmation,
				setShowConfirmation,
				updateAvatar,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
