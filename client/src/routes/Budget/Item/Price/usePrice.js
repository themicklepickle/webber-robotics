import { useState } from "react";

import getSymbolFromCurrency from "currency-symbol-map";
import { exchangeRates } from "exchange-rates-api";

const usePrice = (amount, currency, newCurrency, date) => {
  const [convertedAmount, setConvertedAmount] = useState(null);

  const convert = async (amount, fromCurrency, toCurrency, date) => {
    const instance = exchangeRates();
    instance.setApiBaseUrl("https://api.exchangerate.host");

    if (date === "latest") {
      instance.latest();
    } else {
      instance.at(date);
    }

    return instance
      .base(fromCurrency)
      .symbols(toCurrency)
      .fetch()
      .then((rate) => rate * amount);
  };

  const format = (amount) => {
    if (amount === null) return null;

    const formatter = new Intl.NumberFormat([], {
      style: "currency",
      currency: newCurrency ?? currency,
      currencyDisplay: "code",
    });

    const amountStringWithCode = formatter.format(amount);
    const amountString = amountStringWithCode.split(
      String.fromCharCode(160) // &nbsp (UTF 160) separates the code and the amount
    )[1];

    return amountString;
  };

  if (newCurrency) {
    convert(amount, currency, newCurrency, date ?? "latest").then((newAmount) =>
      setConvertedAmount(newAmount)
    );

    return {
      currencySymbol: getSymbolFromCurrency(newCurrency),
      amountString: format(convertedAmount),
      currencyCode: newCurrency,
    };
  }

  return {
    currencySymbol: getSymbolFromCurrency(currency),
    amountString: format(amount),
    currencyCode: currency,
  };
};

export default usePrice;
