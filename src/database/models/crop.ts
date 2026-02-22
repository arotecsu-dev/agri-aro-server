import mongoose, { Schema } from "mongoose";

const CropSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true },
);

export const Crop = mongoose.model("Crop", CropSchema);
