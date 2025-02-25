import express from "express";
import { uploadMedia } from "../utils/cloudinary.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.route("/upload-video").post(upload.single("file"), async (req, res) => {
  try {
    const result = await uploadMedia(req.file.path);
    console.log(result);
    res.status(200).json({
      success: true,
      data: result,
      message: "File uploaded successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to upload video",
    });
  }
});

export default router;
