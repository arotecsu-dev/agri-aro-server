import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  id?: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  actived?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
  {
    id: { type: String, unique: true, sparse: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    actived: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const User = mongoose.model<IUser>("User", userSchema);
