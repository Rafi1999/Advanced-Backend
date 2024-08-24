import dotenv from "dotenv";
import connectDB from "./db/index.js";


dotenv.config({
    path: './env'
});

connectDB();







/*import express from "express";
const app = express();
; (async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        app.on('error', () => {
            console.log('Error connecting to database');
        });
        app.listen(process.env.PORT,()=>{
            console.log(`Server started at port ${process.env.PORT}`);
        })
        console.log('Database connected')
    } catch (error) {
        console.log('Error connecting to database', error)
    }
})()*/