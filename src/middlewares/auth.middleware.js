// Importing modules
import jwt from "jsonwebtoken";
import envs from "../config/env.config.js";

// Function to check for the user to already exits or not
function authMiddleware(req, res, next) {
    
    // accepting data
    let token = req.cookies.product_token;

    console.log(token)

    // if there is not token then move to next controller
    if (token == undefined) return next();

    // if token is there then verify
    let decoded = jwt.verify(token, envs.JWT_SECRET);

    // set the token as a user
    req.user = decoded;

    return next();

}

export default authMiddleware;