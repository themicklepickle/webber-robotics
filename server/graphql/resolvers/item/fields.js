import { Vendor } from "../../../db/models";

const itemFields = {
  Item: {
    vendor: async (item) => {
      const vendor = await Vendor.findById(item.vendor);

      return vendor;
    },
  },
};

export default itemFields;
