// src/index.ts

// Export core library
export { default as AuthManager } from "./core/AuthManager";

// Export types
export * from "./core/types";

// Export React integration
export { AuthProvider } from "./contexts/AuthContext";
export { useAuth } from "./hooks/useAuth";
export { default as LoginPage } from "./components/LoginPage";
export { default as LoginStatus } from "./components/LoginStatus";
