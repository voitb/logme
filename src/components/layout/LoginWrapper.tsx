import React from "react";
import { Toaster } from "../ui/toaster";

interface Props {
	children: React.ReactNode;
}

const LoginWrapper: React.FC<Props> = ({ children }: Props) => (
	<>
		<div className="flex items-center justify-center h-screen fixed top-0 w-screen">
			{children}
			<Toaster />
		</div>
	</>
);

export default LoginWrapper;
