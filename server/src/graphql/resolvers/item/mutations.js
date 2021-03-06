import { Item, Vendor } from "../../../db/models/";

const getVendorId = async (vendor) => {
  let doc = await Vendor.findOneAndUpdate(vendor, vendor, {
    upsert: true,
    new: true,
  });

  return doc._id;
};

const itemMutations = {
  createItem: async (_, { item }) => {
    const vendorId = await getVendorId(item.vendor);

    const newItem = new Item({ ...item, vendor: vendorId });

    return newItem.save();
  },
  updateItem: async (_, { id, item }) => {
    let vendorId;
    const savedItem = await Item.findById(id);

    if (!item.vendor || Object.keys(item.vendor).length === 0) {
      vendorId = savedItem?.vendor;
    } else {
      vendorId = await getVendorId(item.vendor);
    }

    const updatedItem = await Item.findByIdAndUpdate(
      id,
      { $set: { ...item, vendor: vendorId } },
      { new: true }
    );

    return updatedItem;
  },
  deleteItem: async (_, { id }) => {
    return await Item.findByIdAndDelete(id);
  },
};

export default itemMutations;
