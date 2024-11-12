// import styles
import "./index.css";

// Export core library
export { default as AuthManager } from "./core/auth/AuthManager";

// Export types
export * from "./types";

// Export React integration
export { AuthProvider } from "./contexts/AuthContext";
export { useAuth } from "./hooks/useAuth";
export { default as LoginPage } from "./pages/LoginPage";
export { default as LoginStatus } from "./components/layout/LoginStatus";
export { default as RegisterPage } from "./pages/RegisterPage";
