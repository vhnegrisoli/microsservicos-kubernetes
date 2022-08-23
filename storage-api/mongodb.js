import mongoose from "mongoose";

const MONGO_DB_URL = process.env.MONGO_DB_URL || 'mongodb://admin:123456@localhost:27017';

export function connectMongoDb() {
    mongoose.connect(MONGO_DB_URL, {
        useNewUrlParser: true,
        serverSelectionTimeoutMS: 180000,
    });
    mongoose.connection.on("connected", function () {
        console.info("The application connected to MongoDB successfully!");
    });
    mongoose.connection.on("error", function () {
        console.error("The application connected to MongoDB successfully!");
    });
}