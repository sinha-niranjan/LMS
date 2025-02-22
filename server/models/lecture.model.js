import mongoose, { mongo } from "mongoose";

const lectureSchema = new mongoose.Schema(
  {
    lectureTitle: {
      type: String,
      required: true,
    },
    videoUrl: { type: String },
    publicId: { type: String },
    isPreviewFree: { type: Boolean },
  },
  { timestamps: true }
);

export const lecture = mongoose.model("Lecture", lectureSchema);
