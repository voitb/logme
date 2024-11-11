import { default as React } from '../react';
import { User } from '../core/types';
interface AuthProviderProps {
    children: React.ReactNode;
    apiEndpoint: string;
    onLoginSuccess?: (user: User) => void;
    onLoginError?: (error: Error) => void;
}
export interface AuthContextType {
    user: User | null;
    isLoggedIn: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}
export declare const AuthContext: React.Context<AuthContextType | null>;
export declare const AuthProvider: React.FC<AuthProviderProps>;
export {};
//# sourceMappingURL=AuthContext.d.ts.map