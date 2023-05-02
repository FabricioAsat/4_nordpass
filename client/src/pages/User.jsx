import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const UserPage = () => {
	const navigateTo = useNavigate();

	// Ir a Register si es que no hay user.
	useEffect(() => {
		if (localStorage.getItem("user")) return;

		navigateTo("/register");
	}, []);

	return <div>User</div>;
};
