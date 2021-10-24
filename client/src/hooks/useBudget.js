import { useState } from "react";

const useBudget = () => {
  const [createItemIsVisible, setCreateItemIsVisible] = useState(false);

  const openCreateItem = () => {
    setCreateItemIsVisible(true);
  };

  const closeCreateItem = () => {
    setCreateItemIsVisible(false);
  };

  return {
    createItemIsVisible,
    openCreateItem,
    closeCreateItem,
  };
};

export default useBudget;
