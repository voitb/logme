import { User, AuthListener } from './types';
declare class AuthManager {
    private static instance;
    private user;
    private isLoggedIn;
    private listeners;
    private apiEndpoint;
    private constructor();
    static getInstance(apiEndpoint?: string): AuthManager;
    login(username: string, password: string): Promise<void>;
    logout(): void;
    getUser(): User | null;
    isUserLoggedIn(): boolean;
    subscribe(listener: AuthListener): void;
    unsubscribe(listener: AuthListener): void;
    private notifyListeners;
}
export default AuthManager;
//# sourceMappingURL=AuthManager.d.ts.map