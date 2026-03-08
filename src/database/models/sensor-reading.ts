import mongoose, { Schema, Document } from "mongoose";

const sensorReadingSchema = new Schema(
  {
    deviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Device",
      required: false,
    },
    moment: { type: Date, required: true, default: Date.now },
    phosphorus: { type: Number, required: true, default: 0 },
    nitrogen: { type: Number, required: true, default: 0 },
    ph: { type: Number, required: true, default: 0 },
    potassium: { type: Number, required: true, default: 0 },
    temperature: { type: Number, required: true, default: 0 },
    ambientHumidity: { type: Number, required: true, default: 0 },
    soilMoisture: { type: Number, required: true, default: 0 },
  },
  { timestamps: true },
);

export const SensorReading = mongoose.model(
  "SensorReading",
  sensorReadingSchema,
);
