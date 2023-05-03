import encrypt from "bcrypt";

import User from "../../models/user.model.js";
import { emailValidator } from "../../helpers.js";

export const register = async (req, res) => {
	const { username, email, masterPassword } = req.body;

	console.log("Username", username);
	console.log("Email", email);
	console.log("Password", masterPassword);

	// Validación de email y de existencia de usuario
	const emailCheck = await User.findOne({ email });
	if (!!emailCheck) return res.status(400).send({ message: "El email ya está en uso" });
	if (!emailValidator(email)) return res.status(400).send({ message: "Email inválido" });
	if (masterPassword.length < 5 || masterPassword.length > 50)
		return res.status(400).send({ message: "Contraseña inválida" });
	if (username.length < 3 || username.length > 30)
		return res.status(400).send({ message: "Nombre de usuario inválido" });

	// Encriptado de contraseñas
	const hashedPassword = await encrypt.hash(masterPassword, 10);
	const newUser = await User.create({
		email: email.toLowerCase(),
		username,
		masterPassword: hashedPassword,
	});

	// Creo un objeto que no contenga la contraseña del usuario y la retorno al cliente
	const sanitizedUser = newUser.toObject();
	delete sanitizedUser.masterPassword;

	return res.status(200).send({ message: "Usuario creado", response: sanitizedUser });
};
