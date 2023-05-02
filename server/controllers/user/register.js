import encrypt from "bcrypt";

import User from "../../models/user.model.js";
import { emailValidator } from "../../helpers.js";
export const register = async (req, res) => {
	const { username, email, password } = req.body;

	// Validación de email y de existencia de usuario
	const emailCheck = await User.findOne({ email });
	if (!!emailCheck) return res.status(400).send({ message: "El email ya está en uso" });
	if (!emailValidator(email)) return res.status(400).send({ message: "Email inválido" });
	if (password < 5) return res.status(400).send({ message: "Contraseña inválida" });
	if (username < 3) return res.status(400).send({ message: "Nombre de usuario inválido" });

	// Encriptado de contraseñas
	const hashedPassword = await encrypt.hash(password, 10);
	const newUser = await User.create({
		email: email.toLowerCase(),
		username,
		password: hashedPassword,
	});

	const sanitizedUser = newUser.toObject();
	delete sanitizedUser.password;

	return res.status(200).send({ message: "Usuario creado", response: sanitizedUser });
};
