import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Components
import { Passwords } from "../components/Passwords";
import { Neutral } from "../components/Neutral";

// Images
import logoutImage from "../assets/logout.svg";
import passwordImage from "../assets/password.svg";

// Const
const options = {
	PASSWORD: 1,
};
export const UserPage = () => {
	const [user, setUser] = useState({});
	const [page, setPage] = useState(<Neutral />);

	const navigateTo = useNavigate();

	// Evento click logout
	function handleLogout() {
		localStorage.removeItem("user");
		navigateTo("/login");
	}

	function handleClickCategories(opt) {
		switch (opt) {
			case options.PASSWORD:
				setPage(<Passwords userProps={user} />);
				break;
			default:
				break;
		}
	}

	// Ir a Register si es que no hay user.
	useEffect(() => {
		if (!localStorage.getItem("user")) navigateTo("/register");
		setUser(JSON.parse(localStorage.getItem("user")));
	}, []);

	return (
		<div className="w-full h-full flex">
			<section className="flex flex-col h-full w-full max-w-xs bg-dark2">
				<article className="flex justify-between px-5 py-5 border-b-2 border-dark4">
					<aside
						title={user.email}
						className="bg-teal-800 w-12 h-12 rounded-full font-extrabold flex items-center justify-center cursor-pointer"
					>
						{user.username?.slice(0, 2)}
					</aside>
					<button onClick={handleLogout} title="Logout">
						<img src={logoutImage} alt="logout" className="w-7" />
					</button>
				</article>

				<article className="py-5 ">
					<h6 className="text-xs italic text-[#9ca3af] font-bold px-5">Categorías</h6>

					<aside className="flex flex-col items-start py-2">
						<button
							onClick={() => {
								handleClickCategories(options.PASSWORD);
							}}
							className="flex items-center gap-x-2 w-full py-2 pl-5 hover:bg-dark3 transition-colors duration-300 ease-out"
						>
							<img src={passwordImage} alt="Password" className="w-5" />
							<p className="text-sm font-bold">Passwords</p>
						</button>
					</aside>
				</article>
			</section>

			<article className="h-full w-full px-5 bg-dark4 overflow-y-auto scroll">{page}</article>
		</div>
	);
};
