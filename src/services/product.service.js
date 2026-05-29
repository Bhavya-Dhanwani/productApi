//Importing modules 
import productModel from "../models/product.model.js";
import validateProductData from "../validators/product.validate.js";
import { uploadImage } from "./imagekit.service.js";

// Making the function to create a product
async function createService(files, name, description, price, catageory, email) {
    
    // validating the data of the product
    validateProductData(name, email, description, price, catageory, files);
    
    // uploading images to imagekit
    const uploads = await Promise.all(files.map(file => uploadImage(file)));

    // Adding the product in the databse
    const product = await productModel.create({
        name,
        email,
        description,
        price,
        catageory,
        images: uploads
    });

    return product;

}

export { createService }
