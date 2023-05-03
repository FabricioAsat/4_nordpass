import UserPassword from "../../models/userPassword.model.js";

// POST - Necesito el email del usuario
export const getallpasswords = async (req, res) => {
	const { user_id } = req.body;

	// Validaciones
	if (!user_id) return res.status(400).send({ message: "Error de usuario" });

	const allPasswords = await UserPassword.find({ user_id }).sort({ createdAt: 1 });

	return res.status(200).send({ message: null, response: allPasswords });
};
