import UserPassword from "../../models/userPassword.model.js";

export const createPassword = async (req, res) => {
	const body = req.body;

	// Validations
	if (!body.user_id) return res.status(400).send({ message: "Error usuario" });
	if (!body.title) return res.status(400).send({ message: "Llena el campo Title" });
	if (!body.username_email) return res.status(400).send({ message: "Llena el campo Username" });
	if (!body.password) return res.status(400).send({ message: "Llena el campo Password" });

	// Crea una password
	const newPassword = await UserPassword.create({
		user_id: body.user_id,
		title: body.title,
		username_email: body.username_email,
		password: body.password,
		webpage: body.webpage || "",
		description: body.description || "",
		createdAt: Date.now(),
	});

	if (!newPassword) return res.status(400).send({ message: "No se pudo crear la contraseña" });

	return res.status(200).send({ message: "Contraseña creada", response: newPassword });
};
