import { useAuth } from "./useAuth";

export default () => {
	const { navigate } = useAuth();
	return (dest: string) => {
		if (navigate) navigate(dest);
		else window.location.href = dest;
	};
};
