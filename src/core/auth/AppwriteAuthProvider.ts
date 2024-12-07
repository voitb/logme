// AppwriteAuthProvider.ts
import { ID } from "appwrite";
import { account, storage } from "../../lib/appwrite";
import {
	User,
	AuthListener,
	AuthProvider,
	ProfileDetails,
	RegisterDetails,
	AppwriteRawUser,
} from "../../types/auth.types";
import Cookies from "js-cookie";
import { STORAGE_ID } from "../../config";

class AppwriteAuthProvider implements AuthProvider {
	private user: User | null = null;
	private isLoggedIn: boolean = false;
	private isInitialized: boolean = false;
	private listeners: AuthListener[] = [];
	private isLoadingUser: boolean = false;

	public async initialize() {
		if (this.isLoadingUser) return;

		this.isLoadingUser = true;
		try {
			const currentUser = await account.get();
			await this.setUserFromAccount(currentUser);
		} catch (error) {
			console.error("Failed to fetch user from Appwrite:", error);
			this.clearAuthState();
		} finally {
			this.isLoadingUser = false;
			this.isInitialized = true;
			this.notifyListeners();
		}
	}

	private clearAuthState() {
		this.user = null;
		this.isLoggedIn = false;
		this.notifyListeners();
	}

	private convertUser = (user: AppwriteRawUser): User => {
		return {
			id: user.$id,
			email: user.email,
			username: user.name,
			emailVerification: user.emailVerification,
			// We'll populate avatar later in setUserFromAccount
		};
	};

	private async setUserFromAccount(user: AppwriteRawUser) {
		const userObj = this.convertUser(user);

		if (user.prefs && user.prefs.avatarId) {
			try {
				const avatarUrl = storage.getFilePreview(
					STORAGE_ID,
					user.prefs.avatarId
				);
				userObj.avatar = avatarUrl.href;
			} catch (error) {
				console.error("Failed to fetch avatar preview:", error);
			}
		}

		this.user = userObj;
		this.isLoggedIn = true;
		this.notifyListeners();
	}

	public async fetchLoggedUser() {
		try {
			const currentUser = await account.get();
			await this.setUserFromAccount(currentUser);
		} catch (error) {
			console.error("Failed to fetch user from Appwrite:", error);
			this.clearAuthState();
		}
	}

	async login(email: string, password: string): Promise<void> {
		await account.createEmailPasswordSession(email, password);
		await this.fetchLoggedUser();
	}

	async register(userDetails: RegisterDetails): Promise<void> {
		const { email, password, username } = userDetails;
		await account.create(ID.unique(), email, password, username);
		await account.createEmailPasswordSession(email, password);
		await this.fetchLoggedUser();
		await this.sendEmailVerification();
	}

	async logout(): Promise<void> {
		await account.deleteSession("current");
		this.clearAuthState();
	}

	async setSession(userId: string, secret: string): Promise<void> {
		this.isLoadingUser = true;
		try {
			await account.createSession(userId, secret);
			await this.fetchLoggedUser();
		} catch (error) {
			console.error("Failed to set session:", error);
			this.clearAuthState();
		} finally {
			this.isLoadingUser = false;
			this.notifyListeners();
		}
	}

	async sendResetPassword(
		userId: string,
		secret: string,
		newPassword: string
	): Promise<void> {
		await account.updateRecovery(userId, secret, newPassword);
	}

	async updatePrefs(prefs: { [key: string]: any }): Promise<void> {
		await account.updatePrefs(prefs);
		await this.fetchLoggedUser();
	}

	async updateAvatar(file: File): Promise<void> {
		try {
			const uploadedFile = await storage.createFile(
				STORAGE_ID,
				ID.unique(),
				file
			);
			await account.updatePrefs({ avatarId: uploadedFile.$id });
			await this.fetchLoggedUser();
		} catch (error) {
			console.error("Failed to update avatar:", error);
			throw error;
		}
	}

	getUser(): User | null {
		return this.user;
	}

	public getIsLoading(): boolean {
		return this.isLoadingUser;
	}

	getInitialized(): boolean {
		return this.isInitialized;
	}

	isUserLoggedIn(): boolean {
		return this.isLoggedIn;
	}

	subscribe(listener: AuthListener): void {
		this.listeners.push(listener);
	}

	unsubscribe(listener: AuthListener): void {
		this.listeners = this.listeners.filter((l) => l !== listener);
	}

	private notifyListeners() {
		this.listeners.forEach((listener) =>
			listener(this.isLoggedIn, this.user, this.isInitialized)
		);
	}

	async forgotPassword(email: string): Promise<void> {
		await account.createRecovery(
			email,
			`${window.location.origin}/reset-password`
		);
	}

	async updateProfile(profileDetails: ProfileDetails): Promise<void> {
		// Update username if provided
		// if (profileDetails.username) {
		//   await account.updateName(profileDetails.username as string);
		// }

		// // Update email if provided
		// firstly check if user gave good password
		// if (profileDetails.email) {
		//   await account.updateEmail(profileDetails.email);
		// }

		// // Update password if provided
		// if (profileDetails.password) {
		//   await account.updatePassword(profileDetails.password);
		// }

		// // If we have preferences to update, call updatePrefs here
		// if (profileDetails.prefs) {
		//   await account.updatePrefs(profileDetails.prefs);
		// }

		await this.fetchLoggedUser();
	}

	async sendEmailVerification(): Promise<void> {
		const { origin } = window.location;
		await account.createVerification(`${origin}/verification-complete`);
	}

	async sendConfirmVerification(userId: string, secret: string): Promise<void> {
		await account.updateVerification(userId, secret);
		await this.fetchLoggedUser();
	}

	async getIsEmailVerified(): Promise<boolean> {
		return this.user?.emailVerification || false;
	}

	setCookie(): void {
		Cookies.set("auth_session", "active", { expires: 7 });
	}
}

export default AppwriteAuthProvider;
