import { useState } from "react";
import { toast } from "sonner";

// Images
import passwordImage from "../assets/password.svg";
import show from "../assets/show.svg";
import hide from "../assets/hide.svg";
import linkImage from "../assets/link.svg";
import copyImage from "../assets/copy.svg";

const targets = {
	USERNAME_EMAIL: "username_email",
	PASSWORD: "password",
	WEBSITE: "webpage",
	DESCRIPTION: "description",
};

export const ShowPassword = ({ setShowPassword, passProps }) => {
	const [showPass, setShowPass] = useState(false);
	const [isHovered, setIsHovered] = useState({
		[targets.USERNAME_EMAIL]: false,
		[targets.PASSWORD]: false,
		[targets.WEBSITE]: false,
		[targets.DESCRIPTION]: false,
	});

	console.log(passProps);

	function handleIsHovered(target, isEnter) {
		setIsHovered({ ...isHovered, [target]: isEnter });
	}

	function handleCopy(target) {
		navigator.clipboard.writeText(passProps[target]);
		toast.success("Valor copiado");
	}

	return (
		<div className="absolute h-full bg-black/50 top-0 right-0 w-full py-5">
			<div className="relative h-full bg-dark4 w-full max-w-3xl mx-auto pt-10 px-5 overflow-y-auto scroll text-sm">
				<aside className="w-full flex flex-col gap-y-3 items-center pb-10">
					<span className="bg-neutral-950 h-16 w-16 rounded-md flex items-center justify-center text-lg font-extrabold mx-5">
						<p className="text-3xl text-center">{passProps.title.slice(0, 2)}</p>
					</span>
					<h3 className="text-3xl font-bold">{passProps.title}</h3>
				</aside>

				<section className="flex flex-col gap-y-5 bg-dark2 rounded-2xl py-4">
					<aside
						onMouseEnter={() => {
							handleIsHovered(targets.USERNAME_EMAIL, true);
						}}
						onMouseLeave={() => {
							handleIsHovered(targets.USERNAME_EMAIL, false);
						}}
						className="relative flex items-center gap-x-4 px-4 py-5 hover:bg-dark1"
					>
						<span className="w-full max-w-[160px]">Email/Username</span>
						<span className="w-full">{passProps.username_email}</span>
						{isHovered[targets.USERNAME_EMAIL] && (
							<span className="absolute right-0">
								<img
									onClick={() => handleCopy(targets.USERNAME_EMAIL)}
									src={copyImage}
									alt="Copy"
									title="Copiar"
									className="w-8 mr-5 bg-neutral-950 rounded-full p-1 cursor-pointer"
								/>
							</span>
						)}
					</aside>

					<aside
						onMouseEnter={() => {
							handleIsHovered(targets.PASSWORD, true);
						}}
						onMouseLeave={() => {
							handleIsHovered(targets.PASSWORD, false);
						}}
						className="relative flex items-center gap-x-4 px-4 py-5 hover:bg-dark1"
					>
						<span className="w-full max-w-[160px]">Contraseña</span>
						<span className="w-full bg-transparent">
							{showPass ? "********" : passProps[targets.PASSWORD]}
						</span>

						{isHovered[targets.PASSWORD] && (
							<div className="absolute right-0 flex">
								<span className="">
									<img
										onClick={() => setShowPass(!showPass)}
										src={showPass ? show : hide}
										alt="show-hide"
										title="Ver"
										className="w-8 mr-5 bg-neutral-950 rounded-full p-1 cursor-pointer"
									/>
								</span>
								<span className="">
									<img
										onClick={() => handleCopy(targets.PASSWORD)}
										src={copyImage}
										alt="Copy"
										title="Copiar"
										className="w-8 mr-5 bg-neutral-950 rounded-full p-1 cursor-pointer"
									/>
								</span>
							</div>
						)}
					</aside>

					<aside
						onMouseEnter={() => {
							handleIsHovered(targets.WEBSITE, true);
						}}
						onMouseLeave={() => {
							handleIsHovered(targets.WEBSITE, false);
						}}
						className="relative flex items-center gap-x-4 px-4 py-5 hover:bg-dark1"
					>
						<span className="w-full max-w-[160px]">Sitio web</span>
						<span className="w-full">{passProps[targets.WEBSITE]}</span>
						{isHovered[targets.WEBSITE] && (
							<div className="absolute right-0 flex">
								<a href={`https://${passProps[targets.WEBSITE]}`} target="_blank" rel="noreferrer">
									<img
										src={linkImage}
										alt="website"
										title="Ir a"
										className="w-8 mr-5 bg-neutral-950 rounded-full p-1 cursor-pointer"
									/>
								</a>
								<span className="">
									<img
										onClick={() => handleCopy(targets.WEBSITE)}
										src={copyImage}
										alt="Copy"
										title="Copiar"
										className="w-8 mr-5 bg-neutral-950 rounded-full p-1 cursor-pointer"
									/>
								</span>
							</div>
						)}
					</aside>

					<aside
						onMouseEnter={() => {
							handleIsHovered(targets.DESCRIPTION, true);
						}}
						onMouseLeave={() => {
							handleIsHovered(targets.DESCRIPTION, false);
						}}
						className="relative flex items-center gap-x-4 px-4 py-5 hover:bg-dark1"
					>
						<span className="w-full max-w-[160px]">Descripción</span>
						<span className="w-full bg-transparent">{passProps[targets.DESCRIPTION]}</span>
					</aside>
				</section>

				<aside className="flex items-center justify-center">
					<button
						onClick={(e) => {
							e.preventDefault();
							setShowPassword(false);
						}}
						className="my-5 py-2 px-10 border rounded-full border-neutral-500 text-xs"
					>
						Cerrar
					</button>
				</aside>
			</div>
		</div>
	);
};
