// Importing modules
import { createService } from "../services/product.service.js";
import ApiError from "../utils/ApiError.util.js";
import ApiResponse from "../utils/ApiResponse.util.js";

/*
@Route create
@access private
@use to Authenticate users
@Type POST
*/
async function createProduct(req, res) {

    // Authorizing the user
    if (!req.user) {
        throw new ApiError(409, "User unauthorized");
    }

    // accepting the data
    let { name, description, price, catageory } = req.body;
    let { email } = req.user;

    // using the service to create the product
    const product = await createService(req.files, name, description, price, catageory, email);

    return ApiResponse(res, 201, "Product created successfully", product);

}

export { createProduct };