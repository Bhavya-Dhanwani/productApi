// Importing moduels
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import envs from "../config/env.config.js";

// Schema for the user to save in the database
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

// Adding the pre function to hash the password
userSchema.pre("save", function () {

    // Checking if password is already hashed or not
    if (this.isModified("password")) return;

    // If not then hashing the password with 10 salt rounds.
    this.password = bcrypt.hashSync(this.password, 10);

});

// Making a method to generate a JWT
userSchema.methods.generateJWT = function () {

    // generating and returning the jwt token
    return jwt.sign({
        id: this._id,
        name: this.name,
        email: this.email
    }, envs.JWT_SECRET, {
        expiresIn: "7d"
    });

}

// Making a method to compare the password
userSchema.methods.comparePassword = function(password) {

    // Comparing the passwords
    return bcrypt.compareSync(password, this.password);

}

// Making the user Model 
const userModel = await new mongoose.model("users", userSchema);
export default userModel;