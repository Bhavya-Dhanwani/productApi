import client from "../config/imagekit.config.js";
import envs from "../config/env.config.js";

function getUploadAuthentication() {
    return {
        ...client.helper.getAuthenticationParameters(),
        publicKey: envs.IMAGEKIT_PUBLIC_KEY,
        urlEndpoint: envs.URL_ENDPOINT
    };
}

async function delteImage(id) {

    // Deleting images by using id
    await client.files.delete(id);

    return true;

}


export { getUploadAuthentication, delteImage };
