//Importing modules 
import mongoose from "mongoose";
import productModel from "../models/product.model.js";
import validateProductData from "../validators/product.validate.js";
import { delteImage } from "./imagekit.service.js";
import ApiError from "../utils/ApiError.util.js";

// Making the function to create a product
async function createService(images, name, description, price, catageory) {

    // validating the data of the product
    const validImages = validateProductData(name, description, price, catageory, images);

    // Adding the product in the databse
    const product = await productModel.create({
        name,
        description,
        price,
        catageory,
        images: validImages
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

async function updateService(images, name, description, price, catageory, id) {

    // Validating id
    if (!mongoose.Types.ObjectId.isValid(id)) throw new ApiError(400, "Ivalid Product id");

    // Fetchinf the product from the DB 
    const product = await productModel.findById(id);

    // return if product not there
    if (!product) throw new ApiError(404, "Product not found");

    // validating the data of the product
    const validImages = validateProductData(name, description, price, catageory, images, { requireImages: false });

    if (validImages) {
        const newImageIds = new Set(validImages.map(image => image.id));

        // Deleting replaced images to maintain storage
        for (let i = 0; i < product.images.length; i++) {
            if (newImageIds.has(product.images[i].id)) continue;

            const res = await delteImage(product.images[i].id);
            if (!res) throw new ApiError(500, "Internal Server Error");
        }

        product.images = validImages;
    }

    // Updating products
    product.name = name;
    product.description = description;
    product.price = price;
    product.catageory = catageory

    // Saving the product
    await product.save();

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
