// Importing the modules
import express from "express";
import authRouter from "./auth.router.js";

// Initialinzing the router
const mainRouter = express.Router();

// Configuring branch routers
mainRouter.use("/auth", authRouter);

export default mainRouter;