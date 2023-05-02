import UserPassword from "../../models/userPassword.model.js";

export const createPassword = async (req, res) => {
	try {
		const body = req.body;
	} catch (err) {
		console.error(err.message);
		res.status(err.status || 400).send({ message: err.message });
	}
};
