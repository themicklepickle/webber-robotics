import { Item } from "../../../db/models";

const vendorFields = {
  Vendor: {
    items: async (vendor) => {
      const items = await Item.find({ vendor: vendor.id });

      return items;
    },
  },
};

export default vendorFields;
