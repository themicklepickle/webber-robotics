import { IconButton, Tooltip } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";

import UPDATE_ITEM_PURCHASED from "../../../../graphql/mutations/updateItemPurchased";
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
      <IconButton onClick={toggleCheck}>
        <Tooltip
          title={`Purchased on ${new Date(datePurchased).toDateString()}`}
          placement="bottom"
        >
          <CheckBoxIcon style={{ color: green[500] }}></CheckBoxIcon>
        </Tooltip>
      </IconButton>
    );

  return (
    <IconButton onClick={toggleCheck}>
      <CheckBoxOutlineBlankIcon></CheckBoxOutlineBlankIcon>
    </IconButton>
  );
};

export default IsPurchasedCheckBox;
