import { IconButton, Tooltip } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";

import { useState } from "react";

const IsPurchasedCheckBox = ({
  itemId,
  initialIsChecked,
  initialDatePurchased,
}) => {
  const [isChecked, setIsChecked] = useState(initialIsChecked);
  const [datePurchased, setDatePurchased] = useState(initialDatePurchased);

  const check = () => {
    setIsChecked(true);
    setDatePurchased(new Date());
  };

  const uncheck = () => {
    setIsChecked(false);
    setDatePurchased(null);
  };

  if (isChecked)
    <IconButton onClick={uncheck}>
      <Tooltip
        title={`Purchased on ${datePurchased.toDateString()}`}
        placement="bottom"
      >
        <CheckBoxIcon style={{ color: green[500] }}></CheckBoxIcon>
      </Tooltip>
    </IconButton>;

  return (
    <IconButton onClick={check}>
      <CheckBoxOutlineBlankIcon></CheckBoxOutlineBlankIcon>
    </IconButton>
  );
};

export default IsPurchasedCheckBox;
