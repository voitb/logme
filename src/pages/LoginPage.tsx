import { Separator } from "@/components/ui/separator";
import AuthCard from "@/components/auth/AuthCard";
import LoginForm from "@/components/auth/LoginForm";
import LoginWrapper from "@/components/layout/LoginWrapper";
import SocialLoginButtons from "@/components/auth/SocialLoginButtons";

interface Props {
	title?: string;
	description?: string;
}

const LoginPage = (props: Props) => {
	const { title, description } = props;
	return (
		<LoginWrapper>
			<AuthCard
				title={title || "Log in"}
				description={
					description || "Enter your credentials to access your account."
				}
			>
				<div className="space-y-4">
					<LoginForm />
					<div className="flex items-center my-4 space-x-2 mx-auto">
						<Separator className="!flex-shrink" />
						<span className="px-2 text-sm text-gray-500">or</span>
						<Separator className="!flex-shrink" />
					</div>
					<SocialLoginButtons />
				</div>
			</AuthCard>
		</LoginWrapper>
	);
};

export default LoginPage;
