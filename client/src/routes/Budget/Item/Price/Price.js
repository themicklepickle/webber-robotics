import { CircularProgress } from "@material-ui/core";

import usePrice from "./usePrice";

const Price = ({ amount, currency, newCurrency, date }) => {
  const { currencySymbol, amountString, currencyCode } = usePrice(
    amount,
    currency,
    newCurrency,
    date
  );

  if (amountString === null) {
    return <CircularProgress />;
  }

  return `${currencySymbol}${amountString} ${currencyCode}`;
};

export default Price;
