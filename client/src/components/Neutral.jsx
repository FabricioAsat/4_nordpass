// Images
import notResponsiveImage from "../assets/notresponsive.svg";

export const Neutral = () => {
	return (
		<div className="flex flex-col h-full items-center justify-center">
			<picture className="bg-dark2 p-4 rounded-2xl my-5">
				<img src={notResponsiveImage} alt="password" className="w-24" />
			</picture>
			<h2 className="text-3xl font-bold py-2">Aplicación no responsiva</h2>
			<p className="text-neutral-500 max-w-lg text-xs italic text-center">
				Para una mejor experiencia, utiliza una pantalla con resolución igual o superior a
				1024x720px
			</p>
		</div>
	);
};
