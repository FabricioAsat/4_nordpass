import encrypt from "bcrypt";
import User from "../../models/user.model.js";

export const login = async (req, res) => {
	const { email, masterPassword } = req.body;

	// Búsqueda de usuario
	const user = await User.findOne({ email: email.toLowerCase() });
	if (!user) return res.status(400).send({ message: "Usuario no encontrado" });

	// Comparación de contraseñas
	const isPasswordValid = await encrypt.compare(masterPassword, user.password);
	if (!isPasswordValid) return res.status(400).send({ message: "Contraseña incorrecta" });

	// Creo un objeto que no contenga la contraseña del usuario y la retorno al cliente
	const sanitizedUser = user.toObject();
	delete sanitizedUser.masterPassword;

	return res.status(200).send({ message: "Bienvenido", response: sanitizedUser });
};
