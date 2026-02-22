import mongoose, { Schema } from "mongoose";

const fieldSchema = new Schema(
  {
    fieldName: { type: String, required: true },
    userId: { type: String, required: true },
    cropType: { type: String, required: true },
    soilType: { type: String, required: true },
    fieldSize: { type: String, sparse: true },
    address: { type: String, required: true },
    position: {
      latitude: { type: String, required: true },
      longitude: { type: String, required: true },
    },
    associates: { type: [String], default: [] },
  },
  { timestamps: true },
);

export const Field = mongoose.model("Field", fieldSchema);
