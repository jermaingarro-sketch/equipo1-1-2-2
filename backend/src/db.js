import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://Andrey:337949Agch@localhosst1.mnesp.mongodb.net/mongodb");
        console.log("Database connected");
    } catch (error) {
        console.log("Error: ", error);
    }
};