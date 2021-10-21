import { Budget, Vendor } from "../../../db/models";

const itemFields = {
  Item: {
    vendor: async (item) => {
      const vendor = await Vendor.findById(item.vendor);

      return vendor;
    },
    budget: async (item) => {
      const budget = await Budget.findById(item.budget);

      return budget;
    },
  },
};

export default itemFields;
