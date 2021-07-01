import { useState } from "react";

const useQuantitySelect = (setQuantity) => {
  const [borderStyle, setBorderStyle] = useState({});

  const updateQuantity = (e) => {
    const invalidBorderStyle = {
      borderBottom: "2px solid red",
      borderRadius: "2px",
    };

    let newValue = e.target.value;

    if (newValue < 0) {
      newValue *= -1;
    }

    setQuantity(newValue);
    setBorderStyle(newValue === 0 ? invalidBorderStyle : {});
  };

  return { updateQuantity, borderStyle };
};

export default useQuantitySelect;
