// useAuthMethods.ts
import { User } from "@/types";

interface AuthMethods {
	onLoginSuccess?: (user: User) => void;
	onLoginError?: (error: Error) => void;
	onRegisterSuccess?: () => void;
	onRegisterError?: (error: Error) => void;
	onLogout?: () => void;
	onResetPasswordSuccess?: () => void;
	onResetPasswordError?: (error: Error) => void;
	onUpdateProfileSuccess?: () => void;
	onUpdateProfileError?: (error: Error) => void;
	onSendEmailVerificationSuccess?: () => void;
	onSendEmailVerificationError?: (error: Error) => void;
	onForgotPasswordSuccess?: () => void;
	onForgotPasswordError?: (error: Error) => void;
	onSendConfirmVerificationSuccess?: () => void;
	onSendConfirmVerificationError?: (error: Error) => void;
}

export const useAuthMethods = (methods: AuthMethods = {}) => {
	const defaultOnLoginSuccess = (user: User) => {};

	const defaultOnLoginError = (error: Error) => {};

	const defaultOnRegisterSuccess = () => {};

	const defaultOnRegisterError = (error: Error) => {};

	const defaultOnLogout = () => {};

	const defaultOnResetPasswordSuccess = () => {};

	const defaultOnResetPasswordError = (error: Error) => {};

	const defaultOnUpdateProfileSuccess = () => {};

	const defaultOnUpdateProfileError = (error: Error) => {};

	const defaultOnSendEmailVerificationSuccess = () => {};

	const defaultOnSendEmailVerificationError = (error: Error) => {};

	const defaultOnForgotPasswordSuccess = () => {};

	const defaultOnForgotPasswordError = (error: Error) => {};

	const defaultOnSendConfirmVerificationSuccess = () => {};

	const defaultOnSendConfirmVerificationError = (error: Error) => {};

	return {
		onLoginSuccess: methods.onLoginSuccess || defaultOnLoginSuccess,
		onLoginError: methods.onLoginError || defaultOnLoginError,
		onRegisterSuccess: methods.onRegisterSuccess || defaultOnRegisterSuccess,
		onRegisterError: methods.onRegisterError || defaultOnRegisterError,
		onLogout: methods.onLogout || defaultOnLogout,
		onResetPasswordSuccess:
			methods.onResetPasswordSuccess || defaultOnResetPasswordSuccess,
		onResetPasswordError:
			methods.onResetPasswordError || defaultOnResetPasswordError,
		onUpdateProfileSuccess:
			methods.onUpdateProfileSuccess || defaultOnUpdateProfileSuccess,
		onUpdateProfileError:
			methods.onUpdateProfileError || defaultOnUpdateProfileError,
		onSendEmailVerificationSuccess:
			methods.onSendEmailVerificationSuccess ||
			defaultOnSendEmailVerificationSuccess,
		onSendEmailVerificationError:
			methods.onSendEmailVerificationError ||
			defaultOnSendEmailVerificationError,
		onForgotPasswordSuccess:
			methods.onForgotPasswordSuccess || defaultOnForgotPasswordSuccess,
		onForgotPasswordError:
			methods.onForgotPasswordError || defaultOnForgotPasswordError,
		onSendConfirmVerificationSuccess:
			methods.onSendConfirmVerificationSuccess ||
			defaultOnSendConfirmVerificationSuccess,
		onSendConfirmVerificationError:
			methods.onSendConfirmVerificationError ||
			defaultOnSendConfirmVerificationError,
	};
};
