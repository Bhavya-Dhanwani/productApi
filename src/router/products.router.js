// Importing the modules 
import express from "express";
import upload from "../config/multer.config.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { createProduct } from "../controllers/products.controller.js";
import asyncwrapper from "../utils/asyncwrapper.util.js";

// Initializing the router
const productRouter = express.Router();

// Adding the routes 
productRouter.post("/create", authMiddleware, upload.array("image", 4), asyncwrapper(createProduct));

export default productRouter;
