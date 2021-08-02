import { useState } from "react";

const useQuantitySelect = (itemId, initialQuantity, onChange) => {
  const [isInvalid, setIsInvalid] = useState(false);
  const [quantity, setQuantity] = useState(initialQuantity);

  const updateQuantity = (e) => {
    let newValue = e.target.value;

    if (newValue < 0) {
      newValue *= -1;
    }

    setQuantity(newValue);
    onChange(newValue);
    setIsInvalid(newValue === "0" || newValue === "");
  };

  return { quantity, updateQuantity, isInvalid };
};

export default useQuantitySelect;
