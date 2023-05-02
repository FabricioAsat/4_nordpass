import User from "../../models/user.model.js";

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email: email.toLowerCase() });

		if (!user) throw new Error({ message: "Usuario no encontrado", status: 404 });

		const isPasswordValid = await encrypt.compare(password, user.password);
		if (!isPasswordValid) throw new Error({ message: "Contraseña incorrecta", status: 400 });

		delete user.password;
		return res.status(200).send({ message: "Bienvenido", response: user });
	} catch (err) {
		console.error(err.message);
		return res.status(err.status || 400).send({ message: err.message });
	}
};
