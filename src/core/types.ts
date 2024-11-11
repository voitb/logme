export interface User {
	id: string;
	name: string;
	email: string;
	// Dodatkowe pola
	createdAt: string;
	updatedAt: string;
}

export type AuthListener = (isLoggedIn: boolean, user: User | null) => void;
