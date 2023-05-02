import { BrowserRouter, Route, Routes } from "react-router-dom";

import { UserPage } from "../pages/User";
import { LoginPage } from "../pages/Login";
import { RegisterPage } from "../pages/Register";
import { ErrorPage } from "../pages/Error";

export const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/" element={<UserPage />} />

				<Route path="/*" element={<ErrorPage />} />
			</Routes>
		</BrowserRouter>
	);
};
