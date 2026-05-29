// Importing the modules
import { config } from "dotenv";

// Configuring the env using the config method of dotenv
config();

// Taking all the variables form the .env so that we use them directly and no need to write process.env. every time
const envs = {
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    IMAGEKIT_PUBLIC_KEY: process.env.IMAGEKIT_PUBLIC_KEY,
    IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY,
    URL_ENDPOINT: process.env.URL_ENDPOINT
};

export default envs;