// Importing the modules
import express from "express";
import authRouter from "./auth.router.js";
import productRouter from "./products.router.js";

// Initialinzing the router
const mainRouter = express.Router();

// Configuring branch routers
mainRouter.use("/auth", authRouter);
mainRouter.use("/products", productRouter);

export default mainRouter;