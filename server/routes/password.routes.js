import { Router } from "express";

import { createPassword } from "../controllers/posswords/createPassword.js";
import { getallpasswords } from "../controllers/posswords/getAllPasswords.js";

const passwordRouter = Router();

passwordRouter.post("/getallpasswords", getallpasswords);
passwordRouter.post("/createpassword", createPassword);

export default passwordRouter;
