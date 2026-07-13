import mongoose from "mongoose";

const dbConnection = async () => {
    try {
        const conection = await mongoose.connect(process.env.MONGO_USE_URI);
        console.log("MongoDB Connected");
    } catch (error) {
        console.error(`mongodb connection error: ${error.message}`);
        process.exit(1);
    }
};

export default dbConnection;