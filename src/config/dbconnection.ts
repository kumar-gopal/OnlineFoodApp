import mongoose from "mongoose";


const MONGO_URL = "mongodb+srv://gopal:73199@cluster0.tp2gd.mongodb.net";
const DB_NAME = "FoodApp";

const dbconnect = async () => {
    try {
        const connectionMethod = await mongoose.connect(MONGO_URL + '/' + DB_NAME);
        console.log(`Database is connected successfully!!! DB HOST: ${connectionMethod.connection.host} and DB NAME: ${connectionMethod.connection.name}`);
    } catch (error) {
        console.error("Problem while connecting to database:", error);
    }
};

export { dbconnect };
