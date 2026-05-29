// Importing Modules
import express from "express";
import connectDB from "./config/db.config.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";

// Initializing the app
const app = express();

// Adding the middlewares
app.use(express.json());
app.use(cookieParser());

// Connecting to the DB
await connectDB();

app.use(errorMiddleware)

export default app;