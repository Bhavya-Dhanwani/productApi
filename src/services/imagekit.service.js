// Importing the modules
import { toFile } from "@imagekit/nodejs";
import client from "../config/imagekit.config.js";
import ApiError from "../utils/ApiError.util.js";

// Function to upload the image
async function uploadImage(file) {

    // Checking if the file buffer is original or a fake string
    if (!file?.buffer) {
        throw new ApiError(400, "Image file is missing");
    }

    // Setting a unique file name
    const fileName = `${Date.now()}-${file.originalname}`;

    // Makeing the file uploadable as per the new imagekit version
    const uploadableFile = await toFile(file.buffer, fileName, {
        type: file.mimetype
    });

    // Setting the parameters to upload a file
    const params = {
        file: uploadableFile,
        fileName,
    };

    // Uploading and getting the response
    const response = await client.files.upload(params);

    // returning the url and the id
    return {
        url: response.url,
        id: response.fileId
    };

}

async function delteImage(id) {

    // Deleting images by using id
    await client.files.delete(id);

    return true;

}


export { uploadImage, delteImage };
