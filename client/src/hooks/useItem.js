import { useState } from "react";

import { useMutation } from "@apollo/client";
import { UPDATE_ITEM_QUANTITY } from "../graphql/mutations";

const useItem = (itemId, initialQuantity) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [updateItemQuantity] = useMutation(UPDATE_ITEM_QUANTITY, {
    variables: {
      id: itemId,
    },
  });

  const updateQuantity = async (newQuantity) => {
    const newQuantityInt = parseInt(newQuantity);

    setQuantity(newQuantityInt);
    updateItemQuantity({
      variables: {
        quantity: newQuantityInt,
      },
    });
  };

  return { quantity, updateQuantity };
};

export default useItem;
