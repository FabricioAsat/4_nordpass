import axios from "axios";

export const getPasswords = async (body) => {
	try {
		const { data } = await axios.post(
			import.meta.env.VITE_URL_REQUEST + "passwords/getallpasswords",
			body
		);
		return { status: true, data };
	} catch ({ response }) {
		return { status: false, message: response.data.message || "Error" };
	}
};
