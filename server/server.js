import express from "express";
import cors from "cors";
import userRouter from "./routes/user.routes.js";

const server = express();

// Middleweres
server.use(express.json());
server.use(cors());

// Routes
server.use("/api/auth", userRouter);

// Export server
export default server;
