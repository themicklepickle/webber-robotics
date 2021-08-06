import { useEffect, useState } from "react";

import getSymbolFromCurrency from "currency-symbol-map";

import { CircularProgress } from "@material-ui/core";

import { usePrice } from "../hooks";

const Price = ({ amount, currency, newCurrency, date }) => {
  const { convert, format } = usePrice();
  const [finalAmount, setFinalAmount] = useState(null);

  const currencyCode = newCurrency ?? currency;
  const currencySymbol = getSymbolFromCurrency(currencyCode);

  useEffect(() => {
    if (currencyCode === currency) {
      setFinalAmount(amount);
      return;
    }

    convert(amount, currency, newCurrency, date ?? "latest").then(
      (convertedAmount) => {
        setFinalAmount(convertedAmount);
      }
    );
  }, [amount, currency, currencyCode, date, newCurrency, convert]);

  if (finalAmount === null) {
    return <CircularProgress />;
  }

  const amountString = format(finalAmount, currencyCode);

  return `${currencySymbol}${amountString} ${currencyCode}`;
};

export default Price;
