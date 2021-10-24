import { Item } from "../../../db/models";

const budgetFields = {
  Budget: {
    items: async (budget) => {
      const items = await Item.find({ budget: budget.id });

      return items;
    },
  },
};

export default budgetFields;
