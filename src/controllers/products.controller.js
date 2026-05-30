// Importing modules
import { createService, delteService, getAllProducts, getByIdService, updateService } from "../services/product.service.js";
import ApiError from "../utils/ApiError.util.js";
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
@use to get the products all and as per catageory 
@Type GET
*/
async function getProducts(req, res) {

    let catageory = req.query.catageory;

    // Getting all the products from the service
    const products = await getAllProducts(catageory == undefined ? null : catageory);

    // Sending all products with res 
    return ApiResponse(res, 200, "ALl products fetced successfully", products);
}

/*
@Route get
@access public
@use to get the product by id
@Type GET
*/
async function getProductByID(req, res) {

    // accepting the data
    const id = req.params.id;

    // Using service to get the data
    const product = await getByIdService(id);

    // Sending the product with res 
    return ApiResponse(res, 200, "Product fetced successfully", product);

}

/*
@Route update
@access public
@use to update products
@Type PUT
*/
async function UpdateProducts(req, res) {

    // Accepting the data
    if (!req.user) {
        throw new ApiError(409, "User unauthorized");
    }

    // accepting the data
    let { name, description, price, catageory } = req.body;
    const id = req.params.id;

    // using the service to create the product
    const product = await updateService(req.files, name, description, price, catageory, id);

    // Sending the updated product as data
    return ApiResponse(res, 201, "Product created successfully", product);
}

/*
@Route delete
@access private
@use to delte a product
@Type DELETE
*/
async function deleteProduct(req, res) {

    // Authorizing the user
    if (!req.user) {
        throw new ApiError(409, "User unauthorized");
    }

    // accepting data
    const id = req.params.id;

    // using the delte Service
    await delteService(id);

    // Sending the response
    return ApiResponse(res, 204, "Delted the product successfully");

}

export { createProduct, getProducts, getProductByID, UpdateProducts, deleteProduct };