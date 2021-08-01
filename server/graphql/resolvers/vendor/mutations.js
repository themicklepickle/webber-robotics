import { Vendor } from "../../../db/models";

const vendorMutations = {
  createVendor: async (_, { vendor }) => {
    const newVendor = new Vendor(vendor);

    return newVendor;
  },
};

export default vendorMutations;
