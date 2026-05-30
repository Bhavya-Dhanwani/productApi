//Importing modules 
import mongoose from "mongoose";
import productModel from "../models/product.model.js";
import validateProductData from "../validators/product.validate.js";
import { delteImage, uploadImage } from "./imagekit.service.js";
import ApiError from "../utils/ApiError.util.js";

// Making the function to create a product
async function createService(files, name, description, price, catageorys) {

    // validating the data of the product
    validateProductData(name, description, price, catageory, files);

    // uploading images to imagekit
    const uploads = await Promise.all(files.map(file => uploadImage(file)));

    // Adding the product in the databse
    const product = await productModel.create({
        name,
        description,
        price,
        catageory,
        images: uploads
    });

    return product;

}

// Funciton to get all the products
async function getAllProducts(catageory = null) {

    // Fetching all the products
    const products = await productModel.find();

    return products;
}

export { createService, getAllProducts }
