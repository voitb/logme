import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "../../hooks/useAuth";
import { Loader } from "lucide-react";
import { Toaster } from "../ui/toaster";

const VerificationComplete = () => {
	const { sendVerifyEmail } = useAuth();
	const [isVerifying, setIsVerifying] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		const searchParams = new URLSearchParams(window.location.search);
		const userId = searchParams.get("userId");
		const secret = searchParams.get("secret");

		if (!userId || !secret) {
			setIsVerifying(false);
			setError(true);
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
			} catch (err) {
				console.error("Verification error:", err);
				setError(true);
			} finally {
				setIsVerifying(false);
			}
		};

		verifyEmail();
	}, [sendVerifyEmail]);

	if (isVerifying) {
		return (
			<div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100 dark:bg-gray-900">
				<div className="flex items-center justify-center p-4">
					<Loader className="w-8 h-8 animate-spin text-gray-500 dark:text-gray-400" />
				</div>
				<p className="mt-4 text-sm font-medium text-gray-600 dark:text-gray-300">
					Verifying your email...
				</p>

				<Toaster />
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100 dark:bg-gray-900">
				<h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
					Verification Failed
				</h3>
				<p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
					Invalid or expired verification token. Please request a new
					verification email.
				</p>
				<Toaster />
			</div>
		);
	}

	return (
		<div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100 dark:bg-gray-900">
			<h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
				Email Verified
			</h3>
			<p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
				Your email has been successfully verified. You can close this page now.
			</p>
			<Toaster />
		</div>
	);
};

export default VerificationComplete;
