import mongoose, { Schema } from "mongoose";

const SoilSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true },
);

export const Soil = mongoose.model("Soil", SoilSchema);
