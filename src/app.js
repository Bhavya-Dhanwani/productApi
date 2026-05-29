// Importing Modules
import express from "express";
import connectDB from "./config/db.config.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import mainRouter from "./router/main.router.js";

// Initializing the app
const app = express();

// Adding the middlewares
app.use(express.json());
app.use(cookieParser());

// Connecting to the DB
await connectDB();

// adding the /api router
app.use("/api", mainRouter);

app.use(errorMiddleware);

export default app;