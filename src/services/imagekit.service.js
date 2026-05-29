// Importing the modules 
import { ImageKit } from "@imagekit/nodejs/client.js";
import client from "../config/imagekit.config";

// Funciton to upload the image
function uploadImage(file) {

    // Setting the parameters to uplaod a file
    const params = {
        file: file.buffer,
        fileName: `${Date.now()}-${file.originalName}`,
    };

    // Uploading and getting the response
    const response = await client.files.upload(params);

    // returning the url and the id
    return {
        url: response.url,
        id: response.fileId
    };

}


export { uploadImage };