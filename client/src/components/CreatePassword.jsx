import { useState } from "react";
import { toast } from "sonner";

// Func
import { createPassword } from "../api/passwordsRequests";

// Images
import passwordImage from "../assets/password.svg";
import show from "../assets/show.svg";
import hide from "../assets/hide.svg";

export const CreatePassword = ({ setIsCreattingPassword, userProps, setPasswords, passwords }) => {
	const [viewPass, setViewPass] = useState(false);
	const [focusInput, setFocusInput] = useState({
		title: false,
		username_email: false,
		password: false,
		webpage: false,
		description: false,
	});
	const [body, setBody] = useState({
		title: "",
		username_email: "",
		password: "",
		webpage: "",
		description: "",
		user_id: userProps._id,
	});

	// Funct
	function handleFocusInput(e, isEnter) {
		setFocusInput({ ...focusInput, [e.target.name]: isEnter });
	}

	function handleBodyChanges(e) {
		setBody({ ...body, [e.target.name]: e.target.value });
	}

	function handleSubmit(e) {
		e.preventDefault();

		// Validaciones
		if (!body.title) {
			toast.error("Introduce un título");
			return;
		}

		if (!body.username_email) {
			toast.error("Introduce un nombre de usuario");
			return;
		}
		if (!body.password) {
			toast.error("Introduce una contraseña");
			return;
		}

		async function getData() {
			const data = await createPassword(body);

			if (!data.status) {
				toast.error(data.message);
				return;
			}

			toast.success(data.message);
			setPasswords([...passwords, data.data.response]);
			setIsCreattingPassword(false);
		}
		getData();
	}

	return (
		<div className="absolute h-full bg-black/50 top-0 right-0 w-full py-5">
			<div className="relative h-full bg-dark4 w-full max-w-3xl mx-auto pt-10 overflow-y-auto scroll">
				<picture className="w-full">
					<img src={passwordImage} alt="Password" className="w-24 mx-auto" />
				</picture>

				<form
					onSubmit={handleSubmit}
					className="flex flex-col px-10 gap-y-5 pt-10 pb-5 max-w-xl mx-auto"
				>
					{/* Title */}
					<span
						className={`flex flex-col bg-neutral-950 rounded-md border-2 mb-10 transition-colors duration-300 hover:border-dark1 ${
							focusInput?.title ? "border-dark1" : "border-dark4"
						}`}
					>
						<label htmlFor="title" className="italic px-2 pt-1 text-xs font-bold">
							<small
								className={`transition-colors duration-300 ${
									focusInput?.title ? "text-sky-400" : "text-[#9ca3af]"
								}`}
							>
								<b className="text-red-600">*</b> Título
							</small>
						</label>
						<input
							type="text"
							id="title"
							name="title"
							autoComplete="off"
							onChange={handleBodyChanges}
							value={body.title}
							onFocus={(e) => handleFocusInput(e, true)}
							onBlur={(e) => handleFocusInput(e, false)}
							className="w-full bg-transparent pb-2 pt-1 px-2 outline-none text-sm font-bold"
						/>
					</span>

					<h4>Detalles de registro</h4>

					<span
						className={`flex flex-col bg-neutral-950 rounded-md border-2 transition-colors duration-300 hover:border-dark1 ${
							focusInput?.username_email ? "border-dark1" : "border-dark4"
						}`}
					>
						<label htmlFor="username_email" className="italic px-2 pt-1 text-xs font-bold">
							<small
								className={`transition-colors duration-300 ${
									focusInput?.username_email ? "text-sky-400" : "text-[#9ca3af]"
								}`}
							>
								<b className="text-red-600">*</b> Nombre de usuario o email
							</small>
						</label>
						<input
							type="text"
							id="username_email"
							name="username_email"
							autoComplete="off"
							onChange={handleBodyChanges}
							value={body.username_email}
							onFocus={(e) => handleFocusInput(e, true)}
							onBlur={(e) => handleFocusInput(e, false)}
							className="w-full bg-transparent pb-2 pt-1 px-2 outline-none text-sm font-bold"
						/>
					</span>

					<span
						className={`flex flex-col bg-neutral-950 rounded-md border-2 transition-colors duration-300 hover:border-dark1 ${
							focusInput?.password ? "border-dark1" : "border-dark4"
						}`}
					>
						<label htmlFor="password" className="italic px-2 pt-1 text-xs font-bold">
							<small
								className={`transition-colors duration-300 ${
									focusInput?.password ? "text-sky-400" : "text-[#9ca3af]"
								}`}
							>
								<b className="text-red-600">*</b> Contraseña
							</small>
						</label>

						<span className="flex items-center">
							<input
								type={viewPass ? "text" : "password"}
								id="password"
								name="password"
								autoComplete="off"
								onChange={handleBodyChanges}
								value={body.password}
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
								<img src={viewPass ? hide : show} alt="show-hide" className="w-6" />
							</span>
						</span>
					</span>

					<span
						className={`flex flex-col bg-neutral-950 rounded-md border-2 mt-10 transition-colors duration-300 hover:border-dark1 ${
							focusInput?.webpage ? "border-dark1" : "border-dark4"
						}`}
					>
						<label htmlFor="webpage" className="italic px-2 pt-1 text-xs font-bold">
							<small
								className={`transition-colors duration-300 ${
									focusInput?.webpage ? "text-sky-400" : "text-[#9ca3af]"
								}`}
							>
								Sitio web
							</small>
						</label>
						<input
							type="text"
							id="webpage"
							name="webpage"
							autoComplete="off"
							onChange={handleBodyChanges}
							value={body.webpage}
							onFocus={(e) => handleFocusInput(e, true)}
							onBlur={(e) => handleFocusInput(e, false)}
							className="w-full bg-transparent pb-2 pt-1 px-2 outline-none text-sm font-bold"
						/>
					</span>

					<span
						className={`flex flex-col bg-neutral-950 rounded-md border-2 transition-colors duration-300 hover:border-dark1 ${
							focusInput?.description ? "border-dark1" : "border-dark4"
						}`}
					>
						<label htmlFor="description" className="italic px-2 pt-1 text-xs font-bold">
							<small
								className={`transition-colors duration-300 ${
									focusInput?.description ? "text-sky-400" : "text-[#9ca3af]"
								}`}
							>
								Descripción
							</small>
						</label>
						<textarea
							type="text"
							id="description"
							name="description"
							autoComplete="off"
							onChange={handleBodyChanges}
							value={body.description}
							onFocus={(e) => handleFocusInput(e, true)}
							onBlur={(e) => handleFocusInput(e, false)}
							className="w-full bg-transparent pb-2 pt-1 px-2 h-32 outline-none text-sm font-bold resize-none scroll"
						/>
					</span>

					{/* Submit */}
					<span className="flex items-center justify-center">
						<button className="my-5 mx-5 py-2 px-10 border border-sky-800 rounded-full bg-sky-800 text-xs">
							Guardar
						</button>
						<button
							onClick={(e) => {
								e.preventDefault();
								setIsCreattingPassword(false);
							}}
							className="my-5 mx-5 py-2 px-10 border rounded-full border-neutral-500 text-xs"
						>
							Cerrar
						</button>
					</span>
				</form>
			</div>
		</div>
	);
};
