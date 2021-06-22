import { useState } from "react";

const useQuantitySelect = ({ quantity, setQuantity }) => {
  const [borderStyle, setBorderStyle] = useState({});

  const updateQuantity = (e) => {
    const newValue = e.target.value;

    setQuantity(newValue);

    if (newValue <= 0) {
      setBorderStyle({ borderBottom: "2px solid red", borderRadius: "2px" });
      return;
    }

    setBorderStyle({});
    // TODO: store in DB
  };

  return {
    quantity: quantity,
    updateQuantity: updateQuantity,
    borderStyle: borderStyle,
  };
};

export default useQuantitySelect;
