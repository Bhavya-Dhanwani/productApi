import { ImageKit } from "@imagekit/nodejs/client.js";
import envs from "./env.config.js";

// Intializing the imagekit client
const client = new ImageKit({
    privateKey: envs.IMAGEKIT_PRIVATE_KEY, // Given the private key
});

export default client;