import axios from "axios";

export const POST_register = async (body) => {
	try {
		const { data } = await axios.post(import.meta.env.VITE_URL_REQUEST + "auth/register", body);
		return { status: true, data };
	} catch ({ response }) {
		return { status: false, message: response.data.message || "Error" };
	}
};

export const POST_login = async (body) => {
	try {
		const { data } = await axios.post(import.meta.env.VITE_URL_REQUEST + "auth/login", body);
		return { status: true, data };
	} catch ({ response }) {
		return { status: false, message: response.data.message || "Error" };
	}
};
