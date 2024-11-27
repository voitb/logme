import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "../../hooks/useAuth";
import { Loader } from "lucide-react";

const VerificationComplete = () => {
	const { sendVerifyEmail } = useAuth();
	const [isVerifying, setIsVerifying] = useState(true);

	useEffect(() => {
		const searchParams = new URLSearchParams(window.location.search);
		const userId = searchParams.get("userId");
		const secret = searchParams.get("secret");

		if (!userId || !secret) {
			toast({
				title: "Invalid Verification Link",
				description: "The verification link is invalid or incomplete.",
				variant: "destructive",
			});
			setIsVerifying(false);
			return;
		}

		const verifyEmail = async () => {
			try {
				await sendVerifyEmail(userId, secret);
				toast({
					title: "Email Verified",
					description: "Your email has been successfully verified.",
					variant: "default",
				});
			} catch (error) {
				toast({
					title: "Verification Failed",
					description: "We couldn't verify your email. Please try again.",
					variant: "destructive",
				});
				console.error("Verification error:", error);
			} finally {
				setIsVerifying(false);
			}
		};

		verifyEmail();
	}, []);

	if (isVerifying) {
		return (
			<div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100 dark:bg-gray-900">
				<div className="flex items-center justify-center p-4">
					<Loader className="w-8 h-8 animate-spin text-gray-500 dark:text-gray-400" />
				</div>
				<p className="mt-4 text-sm font-medium text-gray-600 dark:text-gray-300">
					Verifying your email...
				</p>
			</div>
		);
	}

	return null;
};

export default VerificationComplete;
