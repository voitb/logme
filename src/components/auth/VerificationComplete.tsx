import { useEffect, useState } from "react";
import { account } from "../../lib/appwrite";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "../../hooks/useAuth";

const VerificationComplete = () => {
	const { sendVerifyEmail } = useAuth();
	const [isVerifying, setIsVerifying] = useState(true);

	useEffect(() => {
		// Pobierz parametry z URL
		const searchParams = new URLSearchParams(window.location.search);
		const userId = searchParams.get("userId");
		const secret = searchParams.get("secret");

		if (!userId || !secret) {
			toast({
				title: "Invalid Verification Link",
				description: "The verification link is invalid or incomplete.",
				status: "error",
			});
			setIsVerifying(false);
			return;
		}

		const verifyEmail = async () => {
			try {
				console.log(userId, secret);
				sendVerifyEmail(userId, secret);
				toast({
					title: "Email Verified",
					description: "Your email has been successfully verified.",
					status: "success",
				});
			} catch (error) {
				toast({
					title: "Verification Failed",
					description: "We couldn't verify your email. Please try again.",
					status: "error",
				});
				console.error("Verification error:", error);
			} finally {
				setIsVerifying(false);
			}
		};

		verifyEmail();
	}, []);

	if (isVerifying) {
		return <p>Verifying your email...</p>; // Możesz zastąpić loaderem
	}

	return null;
};

export default VerificationComplete;
