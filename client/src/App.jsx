import { Router } from "./routes/Router";
import { Toaster } from "sonner";

export default function App() {
	return (
		<>
			<Toaster position="top-left" richColors />
			<main className="h-screen max-h-screen flex items-center justify-center">
				<Router />
			</main>
		</>
	);
}
