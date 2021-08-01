import { Item } from "../../../db/models/";

const itemMutations = {
  createItem: async (_, { item }) => {
    const newItem = new Item(item);

    return newItem.save();
  },
  updateItem: async (_, { id, item }) => {
    const updatedItem = await Item.findByIdAndUpdate(
      id,
      {
        $set: { ...item },
      },
      { new: true }
    );

    return updatedItem;
  },
};

export default itemMutations;
