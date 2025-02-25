import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/dbConnect.js";
import userRoute from "./routes/user.route.js";
import courseRoute from "./routes/course.route.js";
import mediaRoute from "./routes/media.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 8080;

// default middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// apis
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/media", mediaRoute);

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
