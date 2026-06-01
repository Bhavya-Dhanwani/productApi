import ApiError from "../utils/ApiError.util.js";

function normalizeImages(images) {

    if (typeof images == "string") {
        try {
            return JSON.parse(images);
        } catch (error) {
            throw new ApiError(400, "Images must be a valid JSON array");
        }
    }

    return images;
}

function validateImages(images, required = true) {

    const normalizedImages = normalizeImages(images);

    if (!normalizedImages || normalizedImages.length == 0) {
        if (required) throw new ApiError(400, "Images are required");
        return undefined;
    }

    if (!Array.isArray(normalizedImages)) {
        throw new ApiError(400, "Images must be an array");
    }

    if (normalizedImages.length > 4) {
        throw new ApiError(400, "Only 4 images are allowed");
    }

    normalizedImages.forEach(image => {
        if (!image?.url || !image?.id) {
            throw new ApiError(400, "Each image must include url and id");
        }

        if (typeof image.url != "string" || typeof image.id != "string") {
            throw new ApiError(400, "Image url and id must be strings");
        }
    });

    return normalizedImages.map(image => ({
        url: image.url,
        id: image.id
    }));
}

// Made function to validate the input data
function validateProductData(name, description, price, catageory, images, options = {}) {

    const { requireImages = true } = options;

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

    return validateImages(images, requireImages);

}

export default validateProductData;
