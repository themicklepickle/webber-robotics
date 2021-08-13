import { Schema, model } from "mongoose";

const VendorSchema = new Schema(
  {
    name: { type: String, required: true },
    logo: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default model("Vendor", VendorSchema);
