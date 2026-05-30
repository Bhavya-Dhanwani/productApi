// Importing module
import mongoose from "mongoose";
import { url } from "node:inspector";
import { type } from "node:os";


// Made a schema for the products
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    price: {
        type: Number,
        required: true
    },
    catageory: {
        type: String,
        default: "general"
    },
    images: [
        {
            url: String,
            id: String
        }
    ],
});


// Made the model to handle the products in the database
const productModel = await new mongoose.model("products", productSchema);
export default productModel;