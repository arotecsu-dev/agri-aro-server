import mongoose, { Schema, Document, Types } from "mongoose";

const deviceSchema = new Schema(
  {
    serieId: { type: String, required: true, unique: true },
    deviceName: { type: String, required: true },
    userId: { type: String, required: false },
    fieldId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Field",
      required: false,
    },
  },
  { timestamps: true },
);

export const Device = mongoose.model("Device", deviceSchema);
