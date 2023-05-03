import UserPassword from "../../models/userPassword.model.js";

export const createPassword = async (req, res) => {
	try {
		const body = req.body;

		// Validations
		if (body.title.length === 0) return res.status(400).send({ message: "Llena el campo Title" });
		if (body.username.length === 0)
			return res.status(400).send({ message: "Llena el campo Username" });
		if (body.password.length === 0)
			return res.status(400).send({ message: "Llena el campo Password" });

		//
		return res.status(200).send({ message: "Contraseña creada" });
	} catch (err) {
		console.error(err.message);
		res.status(err.status || 400).send({ message: err.message });
	}
};
