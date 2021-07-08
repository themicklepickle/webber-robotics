import { useState } from "react";

import defaultItems from "./defaultItems";

const useBudget = () => {
  const [items, setItems] = useState(defaultItems);
  const [createItemIsVisible, setCreateItemIsVisible] = useState(true);

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

  const openCreateItem = () => {
    setCreateItemIsVisible(true);
  };

  const closeCreateItem = () => {
    setCreateItemIsVisible(false);
  };

  return {
    items,
    addItem,
    deleteItem,
    updateItem,
    createItemIsVisible,
    openCreateItem,
    closeCreateItem,
  };
};

export default useBudget;
