// Importing the modules 
import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { createProduct, deleteProduct, getProductByID, getProducts, getUploadAuth, UpdateProducts } from "../controllers/products.controller.js";
import asyncwrapper from "../utils/asyncwrapper.util.js";

// Initializing the router
const productRouter = express.Router();

// Adding the routes 
productRouter.get("/upload-auth", authMiddleware, asyncwrapper(getUploadAuth));
productRouter.post("/", authMiddleware, asyncwrapper(createProduct));
productRouter.get("/", asyncwrapper(getProducts));
productRouter.get("/:id", asyncwrapper(getProductByID));
productRouter.put("/:id", authMiddleware, asyncwrapper(UpdateProducts));
productRouter.delete("/:id", authMiddleware, asyncwrapper(deleteProduct));

export default productRouter;
