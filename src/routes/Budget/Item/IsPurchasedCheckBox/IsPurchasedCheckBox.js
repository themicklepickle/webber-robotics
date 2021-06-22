import React from "react";
import { IconButton } from "@material-ui/core";
import useIsPurchasedCheckBox from "./useIsPurchasedCheckBox";

const IsPurchasedCheckBox = (props) => {
  const { icon, toggleCheck } = useIsPurchasedCheckBox(props);

  return <IconButton onClick={toggleCheck}>{icon}</IconButton>;
};

export default IsPurchasedCheckBox;
