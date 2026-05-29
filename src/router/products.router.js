// Importing the modules 
import express from "express";
import upload from "../config/multer.config.js";
import authMiddleware from "../middlewares/auth.middleware.js";

// Initializing the router
const productRouter = express.Router();

export default productRouter;
