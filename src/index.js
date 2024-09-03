import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js"; // Correct import path and destructure if named export is used.

dotenv.config({
  path: './env'  // Ensure the path is correct if your .env file is not in the root
});

connectDB()
  .then(() => {
    app.on('error', (error) => {
      console.error("Error starting the server:", error);
      throw error;
    });

    const PORT = parseInt(process.env.PORT, 10) || 8000;  // Ensure it's a number
    app.listen(PORT, () => {
      console.log(`Server started at port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("MongoDB connection failed:", err);
  });







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