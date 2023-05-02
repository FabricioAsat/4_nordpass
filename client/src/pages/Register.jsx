import { useState } from "react";
import { Link } from "react-router-dom";

//
import logo from "../assets/logo.svg";
import show from "../assets/show.svg";
import hide from "../assets/hide.svg";

export const RegisterPage = () => {
	const [viewPass, setViewPass] = useState(false);
	const [focusInput, setFocusInput] = useState({
		username: false,
		email: false,
		masterPassword: false,
	});
	const [body, setBody] = useState({ username: "", email: "", masterPassword: "" });

	function handleFocusInput(e, isEnter) {
		setFocusInput({ ...focusInput, [e.target.name]: isEnter });
	}

	function handleBodyChanges(e) {
		setBody({ ...body, [e.target.name]: e.target.value });
	}

	function handleOnSubmit(e) {
		e.preventDefault();
	}

	return (
		<div className="flex flex-col max-w-lg w-full mx-auto my-auto bg-dark4 pt-5 pb-10 px-5 rounded-xl">
			<picture>
				<img src={logo} alt="Logo" className="h-32 mx-auto" />
			</picture>

			<aside className="flex flex-col items-center">
				<h1 className="text-3xl font-bold text-center">Secure passwords</h1>
				<i className="text-green-500">Be unhackable</i>
			</aside>

			<form onSubmit={handleOnSubmit} className="flex flex-col px-5 sm:px-10 gap-y-10 pt-10 pb-5">
				<span
					className={`flex flex-col bg-neutral-950 rounded-md border-2 transition-colors duration-300 hover:border-dark1 ${
						focusInput?.username ? "border-dark1" : "border-dark4"
					}`}
				>
					<label htmlFor="username" className="italic px-2 pt-1 text-xs font-bold">
						<small
							className={`transition-colors duration-300 ${
								focusInput?.username ? "text-sky-400" : "text-[#9ca3af]"
							}`}
						>
							Username
						</small>
					</label>
					<input
						type="text"
						id="username"
						name="username"
						autoComplete="off"
						onChange={handleBodyChanges}
						value={body.username}
						onFocus={(e) => handleFocusInput(e, true)}
						onBlur={(e) => handleFocusInput(e, false)}
						className="w-full bg-transparent pb-2 pt-1 px-2 outline-none text-sm font-bold"
					/>
				</span>

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
						<button
							className="mr-3 mb-1"
							onClick={(e) => {
								e.preventDefault(), setViewPass(!viewPass);
							}}
						>
							<img src={viewPass ? hide : show} alt="" className="w-6" />
						</button>
					</span>
				</span>

				<input
					type="submit"
					value="Crear cuenta"
					onClick={handleOnSubmit}
					className="cursor-pointer w-64 mx-auto py-3 bg-green-700 rounded-md font-bold"
				/>
			</form>

			<p className="text-center font-bold">
				Already have an account?{" "}
				<Link to={"/login"} className="text-sky-400">
					Log in
				</Link>
			</p>
		</div>
	);
};
