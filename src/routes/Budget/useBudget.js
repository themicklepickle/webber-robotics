import { useState } from "react";

import defaultItems from "./defaultItems";

const useBudget = () => {
  const [items, setItems] = useState(defaultItems);
  const [open, setOpen] = useState(false);

  const addItem = (item) => {
    setItems([...items, item]);
  };

  const deleteItem = (itemIndex) => {
    let newItems = [...items];
    newItems.splice(itemIndex, 1);

    setItems(newItems);
  };

  const updateItem = (item, itemIndex) => {
    let newItems = [...items];
    newItems[itemIndex] = item;

    setItems(newItems);
  };

  return { items, addItem, deleteItem, updateItem };
};

export default useBudget;
