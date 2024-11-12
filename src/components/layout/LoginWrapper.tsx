import React from "react";

interface Props {
	children: React.ReactNode;
}

const LoginWrapper: React.FC<Props> = ({ children }: Props) => (
	<div className="flex items-center justify-center h-screen fixed top-0 w-screen">
		{children}
	</div>
);

export default LoginWrapper;
