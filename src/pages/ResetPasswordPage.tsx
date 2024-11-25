// src/react/components/pages/ResetPasswordPage.tsx
import AuthCard from "@/components/auth/AuthCard";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import LoginWrapper from "@/components/layout/LoginWrapper";

interface Props {
	title?: string;
	description?: string;
}

const ResetPasswordPage = (props: Props) => {
	const { title, description } = props;

	return (
		<LoginWrapper>
			<AuthCard
				title={title || "Reset Your Password"}
				description={
					description || "Enter your new password to reset your account."
				}
			>
				<div className="space-y-4">
					<ResetPasswordForm />
				</div>
			</AuthCard>
		</LoginWrapper>
	);
};

export default ResetPasswordPage;
