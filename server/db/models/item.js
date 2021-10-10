import { Schema, model } from "mongoose";

const ItemSchema = new Schema(
  {
    name: { type: String, required: true },
    priority: { type: String, required: true },
    description: { type: String, required: false },
    quantity: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
    unitPriceCurrency: { type: String, required: true },
    isPurchased: { type: Boolean, required: true },
    datePurchased: { type: String, required: true },
    url: { type: String, required: true },
    image: { type: String, required: false },
    vendor: { type: Schema.Types.ObjectId, ref: "Vendor", required: true },
    budget: { type: Schema.Types.ObjectId, ref: "Budget", required: true },
  },
  {
    timestamps: true,
  }
);

export default model("Item", ItemSchema);
