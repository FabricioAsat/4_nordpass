import mongoose from "mongoose";

const UserPasswordModel = mongoose.Schema({
	title: { type: String, trim: true, require: true },
	username_email: { type: String, trim: true, require: true, unique: false },
	password: { type: String, trim: true, require: true },
	webpage: { type: String, trim: true, require: false },
	description: { type: String, trim: true, require: false },
	user_id: { type: mongoose.Schema.Types.ObjectId, require: true },
	createdAt: { type: Date },
});

export default mongoose.model("UserPasswords", UserPasswordModel);
