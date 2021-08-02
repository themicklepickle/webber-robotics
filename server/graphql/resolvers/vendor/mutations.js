import { Vendor } from "../../../db/models";

const vendorMutations = {
  createVendor: async (_, { vendor }) => {
    const newVendor = new Vendor(vendor);

    return newVendor;
  },
  updateVendor: async (_, { id, vendor }) => {
    const updatedVendor = await Vendor.findByIdAndUpdate(
      id,
      {
        $set: { ...vendor },
      },
      { new: true }
    );

    return updatedVendor;
  },
};

export default vendorMutations;
