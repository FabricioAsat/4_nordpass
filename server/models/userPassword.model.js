import mongoose from "mongoose";

const UserPasswordModel = mongoose.model({
	title: { type: String, trim: true, require: true },
	username: { type: String, trim: true, require: true },
	password: { type: String, trim: true, require: true },
	webpage: { type: String, trim: true, require: false },
	description: { type: String, trim: true, require: false },
});

export default mongoose.model("UserPassword", UserPasswordModel);
