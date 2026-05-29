// Importing Modules
import express from "express";
import connectDB from "./config/db.config.js";
import errorMiddleware from "./middlewares/error.middleware.js";

// Initializing the app
const app = express();

// Connecting to the DB
await connectDB();

app.use(errorMiddleware)

export default app;