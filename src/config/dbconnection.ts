import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


const dbconnect = async () => {
    try {
        const connectionMethod = await mongoose.connect(process.env.MONGO_URL + '/' + process.env.DB_NAME);
        console.log(`Database is connected successfully!!! DB HOST: ${connectionMethod.connection.host} and DB NAME: ${connectionMethod.connection.name}`);
    } catch (error) {
        console.error("Problem while connecting to database:", error);
    }
};

export { dbconnect };