// Importing the modules 
import express from "express";
import upload from "../config/multer.config.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { createProduct, deleteProduct, getProductByID, getProducts, UpdateProducts } from "../controllers/products.controller.js";
import asyncwrapper from "../utils/asyncwrapper.util.js";

// Initializing the router
const productRouter = express.Router();

// Adding the routes 
productRouter.post("/", authMiddleware, upload.array("images", 4), asyncwrapper(createProduct));
productRouter.get("/", asyncwrapper(getProducts));
productRouter.get("/:id", asyncwrapper(getProductByID));
productRouter.put("/:id", authMiddleware, upload.array("images", 4), asyncwrapper(UpdateProducts));
productRouter.delete("/:id", authMiddleware, asyncwrapper(deleteProduct));

export default productRouter;
