import encrypt from "bcrypt";

import User from "../../models/user.model.js";
import { emailValidator } from "../../helpers.js";
export const register = async (req, res) => {
	try {
		const { username, email, password } = req.body;
		const emailCheck = await User.findOne({ email });

		if (!!emailCheck) {
			const err = { message: "El email ya está en uso", status: 400 };
			throw new Error(JSON.stringify(err));
		}
		if (!emailValidator(email)) {
			const err = { message: "Email inválido", status: 400 };
			throw new Error(JSON.stringify(err));
		}

		const hashedPassword = await encrypt.hash(password, 10);
		const newUser = await User.create({
			email: email.toLowerCase(),
			username,
			password: hashedPassword,
		});

		delete newUser.password;

		return res.status(200).send({ message: "Usuario creado", response: newUser });
	} catch (error) {
		const err = JSON.parse(error);

		console.log(err);
		res.status(err.status || 400).send({ message: err.message });
	}
};
