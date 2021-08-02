import { useState } from "react";

import { useMutation } from "@apollo/client";
import UPDATE_ITEM from "../../../graphql/mutations/updateItem";

const useItem = (itemId, initialQuantity) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [updateItem] = useMutation(UPDATE_ITEM, {
    variables: {
      id: itemId,
    },
  });

  const updateQuantity = async (newQuantity) => {
    const newQuantityInt = parseInt(newQuantity);

    setQuantity(newQuantityInt);
    updateItem({
      variables: {
        quantity: newQuantityInt,
      },
    });
  };

  return { quantity, updateQuantity };
};

export default useItem;
