import ApiError from "../utils/ApiError.util.js";

// Made function to validate the input data
function validateProductData(name, description, price, catageory, files) {

    // validations
    if (!name) {
        throw new ApiError(400, "Name is required");
    }

    if (!description) {
        throw new ApiError(400, "description is required");
    }

    if (!price) {
        throw new ApiError(400, "Price is required");
    }

    if (!catageory) {
        throw new ApiError(400, "Catageory is required");
    }

    if (!files || files.length == 0) {
        throw new ApiError(400, "Images are required")
    }

    // Loop to check the file type of each file
    files.forEach(file => {
        // Checking the file types 
        if(file.mimetype != "image/jpeg" && file.mimetype != "image/webp" && file.mimetype != "image/png") {
            throw new ApiError(400, "Only jpeg, jpg, webp and png images are allowed");
        }
    });

}

export default validateProductData;