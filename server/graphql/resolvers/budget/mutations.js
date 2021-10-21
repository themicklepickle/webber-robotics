import { Budget } from "../../../db/models";

const budgetMutations = {
  createBudget: async (_, { budget }) => {
    const newBudget = new Budget(budget);

    return newBudget.save();
  },
  updateBudget: async (_, { id, budget }) => {
    const updatedBudget = await Budget.findByIdAndUpdate(
      id,
      { $set: { ...budget } },
      { new: true }
    );

    return updatedBudget;
  },
  deleteBudget: async (_, { id }) => {
    return await Budget.findByIdAndDelete(id);
  },
};

export default budgetMutations;
