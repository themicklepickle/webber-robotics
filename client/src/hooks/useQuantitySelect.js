import { useState } from "react";

const useQuantitySelect = (setQuantity) => {
  const [isInvalid, setIsInvalid] = useState(false);

  const updateQuantity = (e) => {
    let newValue = e.target.value;

    if (newValue < 0) {
      newValue *= -1;
    }

    setQuantity(newValue);
    setIsInvalid(newValue === "0" || newValue === "");
  };

  return { updateQuantity, isInvalid };
};

export default useQuantitySelect;
