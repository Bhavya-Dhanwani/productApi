// Importing module
import mongoose from "mongoose";
import { url } from "node:inspector";


// Made a schema for the products
const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    catageory: String,
    images: [
        {
            url: String,
            id: String
        }
    ],
    email: String
});


// Made the model to handle the products in the database
const productModel = await new mongoose.model("products", productSchema);
export default productModel;