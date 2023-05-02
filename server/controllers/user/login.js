import User from "../../models/user.model.js";

export const login = async (req, res) => {
	const { email, password } = req.body;

	// Búsqueda de usuario
	const user = await User.findOne({ email: email.toLowerCase() });
	if (!user) return res.status(400).send({ message: "Usuario no encontrado" });

	// Comparación de contraseñas
	const isPasswordValid = await encrypt.compare(password, user.password);
	if (!isPasswordValid) return res.status(400).send({ message: "Contraseña incorrecta" });

	delete user.password;
	return res.status(200).send({ message: "Bienvenido", response: user });
};
