import { useEffect, useState } from "react";
import { toast } from "sonner";

// Func
import { getPasswords } from "../api/passwordsRequests";

// Images
import passwordImage from "../assets/password.svg";

export const Passwords = ({ userProps }) => {
	const [data, setData] = useState([]);

	useEffect(() => {
		if (!userProps._id) return;

		async function getData() {
			const data = await getPasswords({ user_id: userProps._id });
			console.log(data);
			if (!data.status) {
				toast.error(data.message);
				return;
			}
			setData(data.data?.response);
		}
		getData();
	}, [userProps]);

	if (!data || data.length === 0)
		return (
			<div className="flex flex-col h-full items-center justify-center">
				<picture className="bg-dark2 p-4 rounded-2xl my-3">
					<img src={passwordImage} alt="password" className="w-16" />
				</picture>
				<h5 className="text-3xl font-bold py-2">No hay contraseñas</h5>

				<button className="text-gray-400 italic border-2 border-dark1 px-5 py-2 rounded-full hover:brightness-125 duration-300 ease-out transition-all">
					Crear nueva contraseña
				</button>
			</div>
		);

	return (
		<>
			<header className="flex items-center justify-between pt-10 pb-5">
				<h2 className="text-3xl font-bold">Contraseñas</h2>
				<button className="italic text-sm border-2 border-dark1 px-5 py-2 rounded-full hover:brightness-125 duration-300 ease-out transition-all">
					Crear contraseña
				</button>
			</header>
			<section className="flex flex-col items-center justify-center py-5">
				{data.map((pass) => (
					<aside
						key={pass._id}
						className="flex gap-x-4 items-center px-5 py-3 w-full border-t border-neutral-500"
					>
						<span className="bg-dark1 h-10 rounded-md flex items-center justify-center text-lg font-extrabold mx-5">
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
		</>
	);
};
