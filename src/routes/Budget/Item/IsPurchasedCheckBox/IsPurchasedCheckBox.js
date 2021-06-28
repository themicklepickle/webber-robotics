import { IconButton } from "@material-ui/core";

import useIsPurchasedCheckBox from "./useIsPurchasedCheckBox";

const IsPurchasedCheckBox = ({ isChecked, datePurchased, check, uncheck }) => {
  const { icon, toggleCheck } = useIsPurchasedCheckBox(
    isChecked,
    datePurchased,
    check,
    uncheck
  );

  return <IconButton onClick={toggleCheck}>{icon}</IconButton>;
};

export default IsPurchasedCheckBox;
