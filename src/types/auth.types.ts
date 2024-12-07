import { Models } from "appwrite";

export type AppwriteRawUser = Models.User<Models.Preferences>;

export interface User {
	id: string;
	email: string;
	username?: string;
	avatar?: string;
	emailVerification?: boolean;
}

export type AuthListener = (
	isLoggedIn: boolean,
	user: User | null,
	isInitialized: boolean
) => void;

export interface AuthProvider {
	initialize(): Promise<void>;
	login(email: string, password: string): Promise<void>;
	register(userDetails: RegisterDetails): Promise<void>;
	logout(): Promise<void>;
	getUser(): User | null;
	getInitialized(): boolean;
	isUserLoggedIn(): boolean;
	subscribe(listener: AuthListener): void;
	unsubscribe(listener: AuthListener): void;
	forgotPassword(email: string): Promise<void>;
	sendResetPassword(
		userId: string,
		secret: string,
		newPassword: string
	): Promise<void>;
	updateProfile(profileDetails: ProfileDetails): Promise<void>;
	sendEmailVerification(): Promise<void>;
	sendConfirmVerification(userId: string, secret: string): Promise<void>;
	getIsEmailVerified(): Promise<boolean>;
	setCookie(user: AppwriteRawUser): void;
	setSession(userId: string, secret: string): Promise<void>;
	fetchLoggedUser(): Promise<void>;
	getIsLoading(): boolean;
	updateAvatar(avatar: File): Promise<void>;
}

export interface RegisterDetails {
	email: string;
	password: string;
	username?: string;
}

export interface ProfileDetails {
	email?: string;
	password?: string;
	username?: string;
	[key: string]: unknown;
}
