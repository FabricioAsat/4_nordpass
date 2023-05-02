import { Router } from "express";

import { register } from "../controllers/user/register.js";
import { login } from "../controllers/user/login.js";

const userRouter = Router();

userRouter.post("/register", register);
userRouter.post("/login", login);

export default userRouter;
