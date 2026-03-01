import mongoose, { Schema } from "mongoose";

const menuSchema = new Schema(
  {
    date: {
      type: String,
      required: true,
      unique: true,
    },
    sabjiOptions: {
      type: [String],
      required: true,
    },
    sweetOptions: {
      type: [string],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Menu = mongoose.model("Menu", menuSchema);
