import { Models } from "appwrite";

export type RawUser = Models.User<Models.Preferences>;
export interface User {
	id: string;
	email: string;
	username?: string;
	avatar?: string;
}

export type AuthListener = (isLoggedIn: boolean, user: User | null) => void;

export interface AuthProvider {
	login(email: string, password: string): Promise<void>;
	register(userDetails: RegisterDetails): Promise<void>;
	logout(): Promise<void>;
	getUser(): User | null;
	isUserLoggedIn(): boolean;
	subscribe(listener: AuthListener): void;
	unsubscribe(listener: AuthListener): void;
	resetPassword(password: string): Promise<void>;
	forgotPassword(email: string): Promise<void>;
	updateProfile(profileDetails: ProfileDetails): Promise<void>;
	sendEmailVerification(): Promise<void>;
	isEmailVerified(): Promise<boolean>;
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
	[key: string]: any;
}

export interface RegisterDetails {
	email: string;
	password: string;
	username?: string;
}
