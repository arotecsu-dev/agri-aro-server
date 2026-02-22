import mongoose, { Schema } from "mongoose";
const SoilCropSchema = new Schema(
  {
    soil: {
      type: Schema.Types.ObjectId,
      ref: "Soil",
      required: true,
    },

    crop: {
      type: Schema.Types.ObjectId,
      ref: "Crop",
      required: true,
    },

    parameters: [
      {
        key: { type: String, required: true }, // ph, moisture, temperature...
        minValue: Number,
        maxValue: Number,
      },
    ],

    isRecommended: { type: Boolean, default: true },
  },
  { timestamps: true },
);

SoilCropSchema.index({ soil: 1, crop: 1 }, { unique: true });

export const SoilCrop = mongoose.model("SoilCrop", SoilCropSchema);
