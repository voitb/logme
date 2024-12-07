import {
	User,
	AuthListener,
	AuthProvider,
	RegisterDetails,
	ProfileDetails,
	AppwriteRawUser,
} from "../../types/auth.types";

class AuthManager {
	private authProvider: AuthProvider;

	constructor(authProvider: AuthProvider) {
		this.authProvider = authProvider;
	}

	public async initialize(): Promise<void> {
		await this.authProvider.initialize();
	}

	public async login(email: string, password: string): Promise<void> {
		return this.authProvider.login(email, password);
	}

	public async register(userDetails: RegisterDetails): Promise<void> {
		return this.authProvider.register(userDetails);
	}

	public async logout(): Promise<void> {
		return this.authProvider.logout();
	}

	public getUser(): User | null {
		return this.authProvider.getUser();
	}

	public getInitialized(): boolean {
		return this.authProvider.getInitialized();
	}

	public isUserLoggedIn(): boolean {
		return this.authProvider.isUserLoggedIn();
	}

	public subscribe(listener: AuthListener): void {
		this.authProvider.subscribe(listener);
	}

	public unsubscribe(listener: AuthListener): void {
		this.authProvider.unsubscribe(listener);
	}

	public async forgotPassword(email: string): Promise<void> {
		return this.authProvider.forgotPassword(email);
	}

	public async updateAvatar(avatar: File): Promise<void> {
		return this.authProvider.updateAvatar(avatar);
	}

	public async sendResetPassword(
		userId: string,
		secret: string,
		newPassword: string
	): Promise<void> {
		return this.authProvider.sendResetPassword(userId, secret, newPassword);
	}

	public async updateProfile(profileDetails: ProfileDetails): Promise<void> {
		return this.authProvider.updateProfile(profileDetails);
	}

	public async sendEmailVerification(): Promise<void> {
		return this.authProvider.sendEmailVerification();
	}

	public async sendConfirmVerification(
		userId: string,
		secret: string
	): Promise<void> {
		return this.authProvider.sendConfirmVerification(userId, secret);
	}

	public async getIsEmailVerified(): Promise<boolean> {
		return this.authProvider.getIsEmailVerified();
	}

	public getIsLoading(): boolean {
		return this.authProvider.getIsLoading();
	}

	public async setSession(userId: string, secret: string): Promise<void> {
		await this.authProvider.setSession(userId, secret);
	}

	public async fetchLoggedUser(): Promise<void> {
		await this.authProvider.fetchLoggedUser();
	}

	public setCookie(user: AppwriteRawUser): void {
		this.authProvider.setCookie(user);
	}
}

export default AuthManager;
