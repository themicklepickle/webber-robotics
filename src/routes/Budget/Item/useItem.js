import { useState } from "react";

const useItem = (props) => {
  const [isPurchased, setIsPurchased] = useState(props.isPurchased);
  const [datePurchased, setDatePurchased] = useState(props.datePurchased);
  const [quantity, setQuantity] = useState(props.quantity);

  const check = () => {
    setIsPurchased(true);
    setDatePurchased(new Date());
  };

  const uncheck = () => {
    setIsPurchased(false);
    setDatePurchased(null);
  };

  const deleteItem = () => {
    console.log(props.itemIndex);
    props.deleteItem(props.itemIndex);
  };

  return [
    isPurchased,
    datePurchased,
    check,
    uncheck,
    quantity,
    setQuantity,
    deleteItem,
  ];
};

export default useItem;
