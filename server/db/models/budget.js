import { Schema, model } from "mongoose";

const BudgetSchema = new Schema(
  {
    name: { type: String, required: true },
    amount: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export default model("Budget", BudgetSchema);
