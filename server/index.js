import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/dbConnect.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 8080;

// call database connection here
connectDB();
app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});
