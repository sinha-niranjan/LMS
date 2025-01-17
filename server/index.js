import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/dbConnect.js";
import userRoute from "./routes/user.route.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 8080;

// apis
app.use("/api/v1/user", userRoute);

app.get("/health", (_, res) => {
  return res.status(200).json({
    success: true,
    message: "health of api is good !!",
  });
});

// call database connection here
connectDB();
app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});
