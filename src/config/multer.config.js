// Importing modules
import multer from "multer";

// Configuring memory storage
const storage = multer.memoryStorage();

// making the upload class to upload the images
const upload = multer({ storage });

export default upload;
