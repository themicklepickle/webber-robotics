import { Item } from "../../../db/models/";

const itemQueries = {
  items: async () => {
    const items = await Item.find();

    return items;
  },
  item: async (_, { id }) => {
    const item = await Item.findById(id);

    return item;
  },
};

export default itemQueries;
