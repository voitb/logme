import LoginWrapper from "@/components/layout/LoginWrapper";
import AuthCard from "@/components/auth/AuthCard";
import RegisterForm from "@/components/auth/RegisterForm";
import SocialLoginButtons from "@/components/auth/SocialLoginButtons";
import { Separator } from "@/components/ui/separator";
import { cn } from "../lib/utils";
import { useAuth } from "../hooks/useAuth";

interface Props {
	title?: string;
	description?: string;
}

const RegisterPage = (props: Props) => {
	const { loading } = useAuth();
	const { title, description } = props;

	return (
		<LoginWrapper>
			<AuthCard
				title={title || "Register"}
				description={description || "Create a new account."}
			>
				<div className="space-y-4">
					<RegisterForm />
					<div className="flex items-center my-4">
						<Separator className="!flex-shrink" />
						<span className="px-2 text-sm text-gray-500">or</span>
						<Separator className="!flex-shrink" />
					</div>
					<SocialLoginButtons type={"register"} />
					<div className="flex justify-center">
						<span className="px-2 text-sm text-gray-500">
							Already have an account?{" "}
							<a
								className={cn("text-sm text-blue-500 hover:underline", {
									"pointer-events-none opacity-50": !!loading,
								})}
								href="/login"
							>
								Log in
							</a>
						</span>
					</div>
				</div>
			</AuthCard>
		</LoginWrapper>
	);
};

export default RegisterPage;
