import { loginService, signupService } from "../services/auth.service.js";
import ApiResponse from "../utils/ApiResponse.util.js";
import sanitize from "../utils/stanitize.util.js";

/*
@Route signup 
@access public
@use to create and authenticate users
@Type POST
*/
async function signup(req, res) {

    // accepting the data
    let { name, email, password } = req.body;

    // Using the signup service to Authenticate a user 
    const { newuser, token } = await signupService(name, email, password);

    // Setting the token in the cookie
    res.cookie("product_token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    // retunring the data
    return ApiResponse(res, 201, "User created successfully", sanitize(newuser));

}

/*
@Route login
@access public
@use to Authenticate users
@Type POST
*/
async function login(req, res) {

    // accepting the data
    let { email, password } = req.body;

    // Using the signup service to Authenticate a user 
    const { newuser, token } = await loginService(email, password);

    // Setting the token in the cookie
    res.cookie("product_token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    // retunring the data
    return ApiResponse(res, 200, "Login successfully", sanitize(newuser));

}

export { signup, login };