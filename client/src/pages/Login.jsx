import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Funct
import { POST_login } from "../api/userRequests";
import { emailValidator } from "../helpers/emailValidator";

// Images
import logo from "../assets/logo.svg";
import show from "../assets/show.svg";
import hide from "../assets/hide.svg";
import clear from "../assets/delete.svg";

export const LoginPage = () => {
	const [viewPass, setViewPass] = useState(false);
	const [isOnLS, setIsOnLS] = useState(false);
	const [focusInput, setFocusInput] = useState({
		email: false,
		masterPassword: false,
	});
	const [body, setBody] = useState({ email: "", masterPassword: "" });
	const NavigateTo = useNavigate();

	function handleFocusInput(e, isEnter) {
		setFocusInput({ ...focusInput, [e.target.name]: isEnter });
	}

	function handleBodyChanges(e) {
		setBody({ ...body, [e.target.name]: e.target.value });
	}

	function handleDeleteUserEmailLocalstorage() {
		localStorage.removeItem("user-email");
		setBody({ ...body, email: "" });
		setIsOnLS(false);
	}

	// TODO
	function handleOnSubmit(e) {
		e.preventDefault();

		if (!emailValidator(body.email)) {
			toast.error("Email inválido");
			return;
		}

		async function getData() {
			const data = await POST_login(body);
			if (!data.status) {
				toast.error(data.message);
				return;
			}

			toast.success(data.data.message || "Success");
			localStorage.setItem("user-email", data.data.response.email);
			localStorage.setItem("user", JSON.stringify(data.data.response));
			NavigateTo("/");
		}
		getData();
	}

	// Effects
	useEffect(() => {
		if (!!body.email) return;
		const email = localStorage.getItem("user-email");
		if (!email) return;
		setBody({ ...body, email: email });
		setIsOnLS(true);
	}, []);

	return (
		<div className="flex flex-col max-w-lg w-full mx-auto my-auto bg-dark4 pt-5 pb-10 px-5 rounded-xl">
			<picture>
				<img src={logo} alt="Logo" className="h-32 mx-auto" />
			</picture>

			<aside className="flex flex-col items-center">
				<h1 className="text-3xl font-bold text-center">
					{!isOnLS ? "Complete the fields" : `Enter your master pasword`}
				</h1>
				<i className="text-green-500">Be unhackable</i>
			</aside>

			<form onSubmit={handleOnSubmit} className="flex flex-col px-5 sm:px-10 gap-y-10 pt-10 pb-5">
				{!isOnLS ? (
					<span
						className={`flex flex-col bg-neutral-950 rounded-md border-2 transition-colors duration-300 hover:border-dark1 ${
							focusInput?.email ? "border-dark1" : "border-dark4"
						}`}
					>
						<label htmlFor="email" className="italic px-2 pt-1 text-xs font-bold">
							<small
								className={`transition-colors duration-300 ${
									focusInput?.email ? "text-sky-400" : "text-[#9ca3af]"
								}`}
							>
								Email
							</small>
						</label>
						<input
							type="email"
							id="email"
							name="email"
							autoComplete="off"
							onChange={handleBodyChanges}
							value={body.email}
							onFocus={(e) => handleFocusInput(e, true)}
							onBlur={(e) => handleFocusInput(e, false)}
							className="w-full bg-transparent pb-2 pt-1 px-2 outline-none text-sm font-bold"
						/>
					</span>
				) : (
					<aside className="flex items-center">
						<span className="flex gap-x-2 w-fit mx-auto items-center pr-5 pl-3 py-2 italic font-bold rounded-full border-2 text-sm border-dark1 text-[#9ca3af]">
							<img src={logo} alt="img" className="w-5" />
							<p>{body.email}</p>
						</span>
						<button
							onClick={() => {
								handleDeleteUserEmailLocalstorage();
								setIsOnLS(false);
							}}
							className="text-red-600"
						>
							<img src={clear} alt="clear" className="w-5" />
						</button>
					</aside>
				)}
				<span
					className={`flex flex-col bg-neutral-950 rounded-md border-2 transition-colors duration-300 hover:border-dark1 ${
						focusInput?.masterPassword ? "border-dark1" : "border-dark4"
					}`}
				>
					<label htmlFor="masterPassword" className="italic px-2 pt-1 text-xs font-bold">
						<small
							className={`transition-colors duration-300 ${
								focusInput?.masterPassword ? "text-sky-400" : "text-[#9ca3af]"
							}`}
						>
							Master Password
						</small>
					</label>

					<span className="flex items-center">
						<input
							type={viewPass ? "text" : "password"}
							id="masterPassword"
							name="masterPassword"
							autoComplete="off"
							onChange={handleBodyChanges}
							value={body.masterPassword}
							onFocus={(e) => handleFocusInput(e, true)}
							onBlur={(e) => handleFocusInput(e, false)}
							className="w-full bg-transparent pb-2 pt-1 px-2 outline-none text-sm font-bold"
						/>
						<span
							className="mr-3 mb-1"
							onClick={() => {
								setViewPass(!viewPass);
							}}
						>
							<img src={viewPass ? hide : show} alt="eye" className="w-6" />
						</span>
					</span>
				</span>

				<input
					type="submit"
					value="Log in"
					onClick={handleOnSubmit}
					className="cursor-pointer w-64 mx-auto py-3 bg-green-700 rounded-md font-bold"
				/>
			</form>

			<p className="text-center font-bold">
				{"Don't have an account? "}
				<Link to={"/register"} className="text-sky-400">
					Register
				</Link>
			</p>
		</div>
	);
};
