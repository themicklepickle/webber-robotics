import { useState, useEffect } from "react";

const useItem = (
  initialIsPurchased,
  initialDatePurchased,
  initialQuantity,
  update
) => {
  const [isPurchased, setIsPurchased] = useState(initialIsPurchased);
  const [datePurchased, setDatePurchased] = useState(initialDatePurchased);
  const [quantity, setQuantity] = useState(initialQuantity);

  useEffect(update, [isPurchased, quantity]);

  const check = () => {
    setIsPurchased(true);
    setDatePurchased(new Date());
  };

  const uncheck = () => {
    setIsPurchased(false);
    setDatePurchased(null);
  };

  return {
    isPurchased,
    datePurchased,
    check,
    uncheck,
    quantity,
    setQuantity,
  };
};

export default useItem;
