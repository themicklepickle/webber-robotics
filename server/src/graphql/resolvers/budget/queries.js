import { Budget } from "../../../db/models/";

const budgetQueries = {
  budgets: async () => {
    const budgets = await Budget.find();

    return budgets;
  },
  budget: async (_, { id }) => {
    const budget = await Budget.findById(id);

    return budget;
  },
};

export default budgetQueries;
