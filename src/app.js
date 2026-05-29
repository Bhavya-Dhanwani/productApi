// Importing Modules
import express from "express";
import connectDB from "./config/db.config.js";

// Initializing the app
const app = express();

// Connecting to the DB
await connectDB();

export default app;