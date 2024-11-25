import { Separator } from "@/components/ui/separator";
import AuthCard from "@/components/auth/AuthCard";
import ResetPasswordForm from "@/components/auth/ForgotPasswordForm";
import LoginWrapper from "@/components/layout/LoginWrapper";

interface Props {
	title?: string;
	description?: string;
}

const ForgotPasswordPage = (props: Props) => {
	const { title, description } = props;

	return (
		<LoginWrapper>
			<AuthCard
				title={title || "Reset Password"}
				description={description || "Enter your email to reset your password."}
			>
				<div className="space-y-4">
					<ResetPasswordForm />
					<div className="flex items-center my-4 space-x-2 mx-auto">
						<Separator className="!flex-shrink" />
						<span className="px-2 text-sm text-gray-500">or</span>
						<Separator className="!flex-shrink" />
					</div>
					<div className="flex justify-center">
						<span className="px-2 text-sm text-gray-500">
							Remembered your password?{" "}
							<a className="text-blue-400" href="/login">
								Log in
							</a>
						</span>
					</div>
				</div>
			</AuthCard>
		</LoginWrapper>
	);
};

export default ForgotPasswordPage;
