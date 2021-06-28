import { useState } from "react";

const useQuantitySelect = (setQuantity) => {
  const [borderStyle, setBorderStyle] = useState({});

  const updateQuantity = (e) => {
    const newValue = e.target.value;

    const invalidBorderStyle = {
      borderBottom: "2px solid red",
      borderRadius: "2px",
    };

    setQuantity(newValue);
    setBorderStyle(newValue <= 0 ? invalidBorderStyle : {});
  };

  return { updateQuantity, borderStyle };
};

export default useQuantitySelect;
