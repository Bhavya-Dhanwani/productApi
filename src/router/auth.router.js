// Importing modeules
import express from "express";
import asyncwrapper from "../utils/asyncwrapper.util.js";
import { signup } from "../controllers/auth.controller.js";

// Initializing the router
const authRouter = express.Router();

// adding the routes
authRouter.post("/signup", asyncwrapper(signup));

export default authRouter;