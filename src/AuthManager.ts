import axios from "axios";

interface User {
	id: string;
	name: string;
	// Dodatkowe pola użytkownika
}

class AuthManager {
	private static instance: AuthManager;
	private user: User | null = null;
	private isLoggedIn = false;
	private listeners: Array<(isLoggedIn: boolean) => void> = [];

	private constructor() {}

	public static getInstance(): AuthManager {
		if (!AuthManager.instance) {
			console.log("Creating new AuthManager instance");
			AuthManager.instance = new AuthManager();
		}
		console.log("Returning AuthManager instance");
		return AuthManager.instance;
	}

	public async login(username: string, password: string): Promise<void> {
		console.log(`Attempting to log in with username: ${username}`);
		try {
			const response = await axios.post("/api/login", { username, password });
			this.user = response.data.user;
			this.isLoggedIn = true;
			console.log("Login successful");
		} catch (error) {
			console.error("Login failed", error);
		}
		this.notifyListeners();
	}

	public logout(): void {
		console.log("Logging out");
		this.user = null;
		this.isLoggedIn = false;
		this.notifyListeners();
	}

	public getUser(): User | null {
		console.log("Getting user");
		return this.user;
	}

	public isUserLoggedIn(): boolean {
		console.log("Checking if user is logged in");
		return this.isLoggedIn;
	}

	public subscribe(listener: (isLoggedIn: boolean) => void): void {
		console.log("Subscribing a new listener");
		this.listeners.push(listener);
	}

	public unsubscribe(listener: (isLoggedIn: boolean) => void): void {
		console.log("Unsubscribing a listener");
		this.listeners = this.listeners.filter((l) => l !== listener);
	}

	private notifyListeners(): void {
		console.log("Notifying listeners");
		this.listeners.forEach((listener) => listener(this.isLoggedIn));
	}
}

export default AuthManager;
