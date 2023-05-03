import { Router } from "./routes/Router";
import { Toaster } from "sonner";

export default function App() {
	return (
		<>
			<Toaster position="top-left" richColors />
			<div className="h-screen flex items-center justify-center">
				<Router />
			</div>
		</>
	);
}
