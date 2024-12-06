import { Separator } from "@/components/ui/separator";
import AuthCard from "@/components/auth/AuthCard";
import LoginForm from "@/components/auth/LoginForm";
import LoginWrapper from "@/components/layout/LoginWrapper";
import SocialLoginButtons from "@/components/auth/SocialLoginButtons";
import { cn } from "../lib/utils";
import { useAuth } from "../hooks/useAuth";

interface Props {
	title?: string;
	description?: string;
}

const LoginPage = (props: Props) => {
	const { loading } = useAuth();
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
					<div className="flex justify-center">
						<span className="px-2 text-sm text-gray-500">
							Don't have an account?{" "}
							<a
								className={cn("text-sm text-blue-500 hover:underline", {
									"pointer-events-none opacity-50": !!loading,
								})}
								href="/register"
							>
								Register
							</a>
						</span>
					</div>
				</div>
			</AuthCard>
		</LoginWrapper>
	);
};

export default LoginPage;
