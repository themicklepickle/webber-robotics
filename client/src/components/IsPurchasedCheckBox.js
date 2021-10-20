import { IconButton, Tooltip } from "@mui/material";
import { green } from "@mui/material/colors";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

import { UPDATE_ITEM_PURCHASED } from "../graphql/mutations";
import { useMutation } from "@apollo/client";

import { useState } from "react";

const IsPurchasedCheckBox = ({
  itemId,
  initialIsChecked,
  initialDatePurchased,
}) => {
  const [isChecked, setIsChecked] = useState(initialIsChecked);
  const [datePurchased, setDatePurchased] = useState(
    new Date(initialDatePurchased)
  );
  const [updateItemPurchased] = useMutation(UPDATE_ITEM_PURCHASED, {
    variables: {
      id: itemId,
    },
  });

  const toggleCheck = () => {
    const newIsChecked = !isChecked;
    const newDatePurchaed = isChecked ? "" : new Date();

    setIsChecked(newIsChecked);
    setDatePurchased(newDatePurchaed);
    updateItemPurchased({
      variables: {
        isPurchased: newIsChecked,
        datePurchased: newDatePurchaed,
      },
    });
  };

  if (isChecked)
    return (
      <IconButton onClick={toggleCheck} size="large">
        <Tooltip
          title={`Purchased on ${new Date(datePurchased).toDateString()}`}
          placement="bottom"
        >
          <CheckBoxIcon style={{ color: green[500] }}></CheckBoxIcon>
        </Tooltip>
      </IconButton>
    );

  return (
    <IconButton onClick={toggleCheck} size="large">
      <CheckBoxOutlineBlankIcon></CheckBoxOutlineBlankIcon>
    </IconButton>
  );
};

export default IsPurchasedCheckBox;
