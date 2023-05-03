import express from "express";
import cors from "cors";

import userRouter from "./routes/user.routes.js";
import passwordRouter from "./routes/password.routes.js";

const server = express();

// Middleweres
server.use(express.json());
server.use(cors());

// Routes
server.use("/api/auth", userRouter);
server.use("/api/passwords", passwordRouter);

// Export server
export default server;
