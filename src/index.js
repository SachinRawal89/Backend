//require('dotenv').config({path: './env'})

//import mongoose from "mongoose";
//import {DB_NAME} from "./constants";

import dotenv from "dotenv"
import connectDB from "./db/dbconnection.js";

dotenv.config({
    path: './env'
})

connectDB();








/*
import express from "express";

const app = express();

( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("errrror", (error) => {
            console.log("Errror", error);
            throw error;
        })

        app.listen(process.env.PORT, () => {
            console.log(`App listening on port ${process.env.PORT}`);
        })

    } catch (error) {
        console.log("Error: ", error);
        throw error
    }
}) ()

*/