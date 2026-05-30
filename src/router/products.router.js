// Importing the modules 
import express from "express";
import upload from "../config/multer.config.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { createProduct, getProducts } from "../controllers/products.controller.js";
import asyncwrapper from "../utils/asyncwrapper.util.js";

// Initializing the router
const productRouter = express.Router();

// Adding the routes 
productRouter.post("/", authMiddleware, upload.array("images", 4), asyncwrapper(createProduct));
productRouter.get("/", asyncwrapper(getProducts));

export default productRouter;
