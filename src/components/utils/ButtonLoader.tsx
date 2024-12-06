import React from "react";
import { Loader } from "lucide-react";
import { cn } from "../../lib/utils";

interface ButtonLoaderProps {
	children: React.ReactNode;
	loading: boolean;
	className?: string;
}

const ButtonLoader = ({ children, loading, className }: ButtonLoaderProps) => {
	return (
		<>
			{loading ? (
				<Loader
					className={cn("w-2 h-2 animate-spin dark:text-gray-400", className)}
				/>
			) : (
				<>{children}</>
			)}
		</>
	);
};

export default ButtonLoader;
