import { CircularProgress } from "@material-ui/core";

import usePrice from "./usePrice";

const Price = (props) => {
  const { currencySymbol, amountString, currencyCode } = usePrice(props);

  if (amountString === null) {
    return <CircularProgress />;
  }

  return `${currencySymbol}${amountString} ${currencyCode}`;
};

export default Price;
