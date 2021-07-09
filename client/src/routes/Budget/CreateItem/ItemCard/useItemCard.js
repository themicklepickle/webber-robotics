import { useRef } from "react";

const useItemCard = () => {
  const selectButton = useRef(null);

  const focusOnSelectButton = () => {
    selectButton.current.focus();
  };

  return { selectButton, focusOnSelectButton };
};

export default useItemCard;
