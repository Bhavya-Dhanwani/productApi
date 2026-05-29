// Importing the app
import app from "./src/app.js";
import envs from "./src/config/env.config.js";

// Starting the server
app.listen(envs.PORT, () => {
    console.log(`Server Is running on port ${envs.PORT}`);
});