import { Vendor } from "../../../db/models";

const vendorQueries = {
  vendors: async () => {
    const vendors = await Vendor.find();

    return vendors;
  },
  vendor: async (_, { id }) => {
    const vendor = await Vendor.findById(id);

    return vendor;
  },
};

export default vendorQueries;
