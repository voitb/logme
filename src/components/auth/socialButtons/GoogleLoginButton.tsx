import { FcGoogle } from "react-icons/fc";
import { Button } from "../../ui/button";

const GoogleLoginButton = () => {
	const handleGoogleLogin = () => {
		// Implement Google login logic
	};

	return (
		<Button variant="outline" className="w-full" onClick={handleGoogleLogin}>
			<FcGoogle className="mr-2" />
			Login with Google
		</Button>
	);
};

export default GoogleLoginButton;
