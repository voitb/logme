export interface User {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}
export type AuthListener = (isLoggedIn: boolean, user: User | null) => void;
//# sourceMappingURL=types.d.ts.map