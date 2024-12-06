import { OAuthProvider } from "appwrite";
import { loginWithOAuth } from "../../lib/appwrite";
import { stringFirstLetterToUpper } from "../../helpers/stringFirstLetterToUpper.helper";
import SocialIconHandler from "../utils/SocialIconHandler";
import { Button } from "../ui/button";
import { useAuth } from "../../hooks/useAuth";
import ButtonLoader from "../utils/ButtonLoader";

interface SocialLoginButtonProps {
	type: "login" | "register";
	social: OAuthProvider;
}

const SocialLoginButton = ({
	social = OAuthProvider.Github,
	type = "login",
}: SocialLoginButtonProps) => {
	const { loading, setLoading } = useAuth();
	const handleSocialLogin = () => {
		try {
			setLoading(social);
			loginWithOAuth(social);
		} catch (err) {
			setLoading(null);
			console.error(err);
		}
	};
	return (
		<Button
			disabled={!!loading}
			variant="outline"
			className="w-full"
			onClick={handleSocialLogin}
		>
			<ButtonLoader loading={loading === social}>
				<SocialIconHandler social={social} />
				{stringFirstLetterToUpper(type)} with {social}
			</ButtonLoader>
		</Button>
	);
};

export default SocialLoginButton;
