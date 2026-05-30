// Importing modules
import ApiError from "../utils/ApiError.util.js";
import { createService, getAllProducts } from "../services/product.service.js";
import ApiResponse from "../utils/ApiResponse.util.js";

/*
@Route create
@access private
@use to Create products 
@Type POST
*/
async function createProduct(req, res) {

    // Authorizing the user
    if (!req.user) {
        throw new ApiError(409, "User unauthorized");
    }

    // accepting the data
    let { name, description, price, catageory } = req.body;

    // using the service to create the product
    const product = await createService(req.files, name, description, price, catageory);

    return ApiResponse(res, 201, "Product created successfully", product);

}

/*
@Route get
@access public
@use to get the products
@Type GET
*/
async function getProducts(req, res) {

    // Getting all the products from the service
    const products = await getAllProducts();

    // Sending all products with res 
    return ApiResponse(res, 200, "ALl products fetced successfully", products);
}

export { createProduct, getProducts };