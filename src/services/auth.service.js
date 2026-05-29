
// Importing modules
import userModel from "../models/user.model.js";
import { validateSignup } from "../validators/auth.validate.js";

// Making the signup Service
async function signupService(name, email, password) {

    // validating the signup data
    validateSignup(name, email, password);

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

export { signupService };