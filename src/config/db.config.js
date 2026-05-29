// Importing modules
import mongoose from "mongoose";
import envs from "./env.config.js";

// Function to connect the db
async function connectDB() {

    // Error handling while connecting the db
    try {
        // Connecting the db
        await mongoose.connect(envs.MONGODB_URI);
        console.log("Mongo DB Conected");

    } catch (err) {

        // Handling the error
        console.log("Error connecting the DB");

    }
};

export default connectDB;