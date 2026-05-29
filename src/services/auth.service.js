
// Importing modules
import userModel from "../models/user.model.js";
import ApiError from "../utils/ApiError.util.js";
import { validateLogin, validateSignup } from "../validators/auth.validate.js";

// Making the signup Service
async function signupService(name, email, password) {

    // validating the signup data
    validateSignup(name, email, password);

    // Validating if user already exists with a error handler to send custom message
    try {
        const user = await userModel.findOne({ email });

        // throwing the error here to get cathc in the err block
        if (user) throw new ApiError(400, "User already exits. Login now");
    } catch (err) {

        // catching the error in the above block to throw the same error form api
        throw new ApiError(400, "User already exits. Login now");
    }

    // Adding the user in the database
    const newuser = await userModel.create({
        name,
        email,
        password
    });

    // Generating the jwt token  for the user
    const token = newuser.generateJWT();

    // returning the user
    return { newuser, token };
}

// Making the Login Service
async function loginService(email, password) {

    // validating the signup data
    validateLogin(email, password);

    // Checking if the user exists or not
    const newuser = await userModel.findOne({ email });

    // Throwing err if user not found
    if (!newuser) throw new ApiError(404, "User do not exists please create a account first");

    // Comparing the passwords using pre defined functions
    if (newuser.comparePassword(password)) throw new ApiError(400, "Incorrect password");

    // Generating the jwt token  for the user
    const token = newuser.generateJWT();

    // returning the user
    return { newuser, token };
}

export { signupService, loginService };