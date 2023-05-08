import { useEffect, useState } from "react";
import { toast } from "sonner";

// Func
import { getPasswords } from "../api/passwordsRequests";

// Images
import passwordImage from "../assets/password.svg";
import { CreatePassword } from "./CreatePassword";
import { ShowPassword } from "./ShowPassword";

export const Passwords = ({ userProps }) => {
	const [data, setData] = useState([]);
	const [isGettingData, setIsGettingData] = useState(true);
	const [isCreattingPassword, setIsCreattingPassword] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [currentPassword, setCurrentPassword] = useState({});

	function handleCreatePassword() {
		setIsCreattingPassword(true);
	}

	// Effects
	useEffect(() => {
		if (!userProps._id) return;

		async function getData() {
			const data = await getPasswords({ user_id: userProps._id });
			console.log(data);
			if (!data.status) {
				toast.error(data.message);
				setIsGettingData(false);
				return;
			}
			setData(data.data?.response);
		}
		getData();
		setIsGettingData(false);
	}, [userProps]);

	// Loading
	if (isGettingData)
		return (
			<div className="flex flex-col h-full items-center justify-center">
				<picture className="bg-dark2 p-4 rounded-2xl my-3">
					<img src={passwordImage} alt="password" className="w-16 animate-spin" />
				</picture>
				<h5 className="text-3xl font-bold py-2">Cargando contraseñas</h5>
			</div>
		);

	// No hay items
	if (!data || data.length === 0)
		return (
			<>
				<div className="flex flex-col h-full items-center justify-center">
					<picture className="bg-dark2 p-4 rounded-2xl my-3">
						<img src={passwordImage} alt="password" className="w-16" />
					</picture>
					<h5 className="text-3xl font-bold py-2">No hay contraseñas</h5>

					<button
						onClick={handleCreatePassword}
						className="text-gray-400 italic border-2 border-dark1 px-5 py-2 rounded-full hover:brightness-125 duration-300 ease-out transition-all"
					>
						Crear nueva contraseña
					</button>
				</div>
				{isCreattingPassword && (
					<CreatePassword
						setIsCreattingPassword={setIsCreattingPassword}
						userProps={userProps}
						setPasswords={setData}
						passwords={data}
					/>
				)}
			</>
		);

	// Hay items
	return (
		<>
			<header className="flex items-center justify-between pt-10 pb-5">
				<h2 className="text-3xl font-bold">Contraseñas</h2>
				<button
					onClick={handleCreatePassword}
					className="italic text-sm border-2 border-dark1 px-5 py-2 rounded-full hover:brightness-125 duration-300 ease-out transition-all"
				>
					Crear contraseña
				</button>
			</header>
			<section className="flex flex-col items-center justify-center py-5">
				{data.map((pass) => (
					<aside
						key={pass._id}
						onClick={() => {
							setShowPassword(true);
							setCurrentPassword(pass);
						}}
						className="flex gap-x-4 items-center px-5 py-4 w-full border-t border-neutral-500 cursor-pointer hover:bg-dark1/50 transition-colors duration-300 ease-out"
					>
						<span className="bg-neutral-950 h-10 rounded-md flex items-center justify-center text-lg font-extrabold mx-5">
							<p className="w-10 text-center">{pass.title.slice(0, 2)}</p>
						</span>

						<span className="flex flex-col w-full">
							<h3 className="font-bold text-base">{pass.title}</h3>
							<p className="text-xs text-neutral-500">{pass.username_email}</p>
						</span>

						<span className="w-full">
							<p className="text-xs text-neutral-500">{pass.createdAt.slice(0, 10)}</p>
						</span>
					</aside>
				))}
			</section>

			{isCreattingPassword && (
				<CreatePassword
					setIsCreattingPassword={setIsCreattingPassword}
					userProps={userProps}
					setPasswords={setData}
					passwords={data}
				/>
			)}

			{showPassword && (
				<ShowPassword setShowPassword={setShowPassword} passProps={currentPassword} />
			)}
		</>
	);
};
