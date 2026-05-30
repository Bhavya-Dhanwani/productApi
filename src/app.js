// Importing Modules
import express from "express";
import connectDB from "./config/db.config.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import mainRouter from "./router/main.router.js";
import ApiResponse from "./utils/ApiResponse.util.js";

// Initializing the app
const app = express();

// Adding the middlewares
app.use(express.json());
app.use(cookieParser());

// Connecting to the DB
await connectDB();

// adding the /api router
app.use("/api", mainRouter);

// added a ping route to keep the server awake on render 
app.get("/ping", (req, res) => {
    return ApiResponse(res, 200, "Server is working");
});

app.use(errorMiddleware);

export default app;