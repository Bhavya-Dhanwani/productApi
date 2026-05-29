import ApiError from "../utils/ApiError.util.js";

// Funciton to validate the signup data
function validateSignup(name, email, password) {

    // validations
    if (!name) {
        throw new ApiError(400, "Name is required");
    }

    if (!email) {
        throw new ApiError(400, "Email is required");
    }

    if (!password) {
        throw new ApiError(400, "Password is required");
    }

    // Adding the email regex to check the email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Checking the email
    if (!emailRegex.test(email)) {
        throw new ApiError(400, "Enter a valid Email");
    }

    return true;

}

// Funciton to validate the login data
function validateLogin( email, password) {

    // validations
    if (!email) {
        throw new ApiError(400, "Email is required");
    }

    if (!password) {
        throw new ApiError(400, "Password is required");
    }

    // Adding the email regex to check the email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Checking the email
    if (!emailRegex.test(email)) {
        throw new ApiError(400, "Enter a valid Email");
    }

    return true;

}

export { validateSignup, validateLogin };