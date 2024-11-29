import { FcGoogle } from "react-icons/fc";
import { Button } from "../../ui/button";
import { loginWithOAuth } from "../../../lib/appwrite";
import { OAuthProvider } from "appwrite";

const GoogleLoginButton = () => {
	const handleGoogleLogin = () => {
		loginWithOAuth(OAuthProvider.Google);
	};

	return (
		<Button variant="outline" className="w-full" onClick={handleGoogleLogin}>
			<FcGoogle className="mr-2" />
			Login with Google
		</Button>
	);
};

export default GoogleLoginButton;
