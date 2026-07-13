import dotenv from "dotenv";
import app from "./app.js";
import dbConnection from "./config/db.js";

dotenv.config();

const startServer = async () => {
    try {
        await dbConnection();

        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });

    } catch (error) {
        console.error(`server error: ${error.message}`);
    }
};

startServer();
