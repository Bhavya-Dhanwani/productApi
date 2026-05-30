//Importing modules 
import mongoose from "mongoose";
import productModel from "../models/product.model.js";
import validateProductData from "../validators/product.validate.js";
import { delteImage, uploadImage } from "./imagekit.service.js";
import ApiError from "../utils/ApiError.util.js";

// Making the function to create a product
async function createService(files, name, description, price, catageory) {

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

    let products;

    // Fetching all the products with conditions to apply the filters
    if (catageory != null) products = await productModel.find({ catageory });
    else products = await productModel.find();

    return products;
}

async function getByIdService(id) {

    // Validating id
    if (!mongoose.Types.ObjectId.isValid(id)) throw new ApiError(400, "Ivalid Product id");

    // fetching the product by id
    const product = await productModel.findById(id);

    return product;

}

async function updateService(files, name, description, price, catageory, id) {

    // Validating id
    if (!mongoose.Types.ObjectId.isValid(id)) throw new ApiError(400, "Ivalid Product id");

    // validating the data of the product
    validateProductData(name, description, price, catageory, files);

    // Fetchinf the product from the DB 
    const product = await productModel.findById(id);

    // return if product not there
    if (!product) throw new ApiError(404, "Product not found");

    // Deleting old images to maintain the storage so that on image change the old images disappear
    for (let i = 0; i < product.images.length; i++) {
        const res = await delteImage(product.images[i].id);
        if (!res) throw new ApiError(500, "Internal Server Error");
    }

    // uploading images to imagekit
    const uploads = await Promise.all(files.map(file => uploadImage(file)));

    // Updating products
    product.images = uploads;
    product.name = name;
    product.description = description;
    product.price = price;
    product.catageory = catageory

    // Saving the product
    product.save();

    return product;

}

async function delteService(id) {

    // Validating id
    if (!mongoose.Types.ObjectId.isValid(id)) throw new ApiError(400, "Ivalid Product id");

    // Finding the product
    const product = await productModel.findById(id);

    // return if product not there
    if (!product) throw new ApiError(404, "Product not found");

    // Deleting images to save storage
    for (let i = 0; i < product.images.length; i++) {
        const res = await delteImage(product.images[i].id);
        if (!res) throw new ApiError(500, "Internal Server Error");
    }

    // Delteing the item
    await productModel.findByIdAndDelete(id);

    return true;

}

export { createService, getAllProducts, getByIdService, updateService, delteService }
