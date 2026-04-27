import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const dbName = process.env.MONGO_DB_NAME || "bookey";

        const connection = await mongoose.connect(process.env.MONGO_URI, {
            dbName,
        });

        console.log(`MongoDB Connected: ${connection.connection.host}/${dbName}`);
    } catch (error) {
        console.error("DB Error:", error.message);
        process.exit(1);
    }
};

export default connectDB;
