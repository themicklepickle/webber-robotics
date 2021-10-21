import { useApolloClient } from "@apollo/client";
import { useCallback } from "react";
import { EXCHANGE_RATE } from "../graphql/queries";

const usePrice = () => {
  const client = useApolloClient();

  const convert = useCallback(
    async (amount, fromCurrency, toCurrency, date) => {
      const result = await client.query({
        query: EXCHANGE_RATE,
        variables: {
          fromCurrency,
          toCurrency,
          date,
        },
      });
      const { rate } = result.data.exchangeRate;

      return rate * amount;
    },
    [client]
  );

  const format = (amount, currency) => {
    if (amount === null) return null;

    const formatter = new Intl.NumberFormat([], {
      style: "currency",
      currencyDisplay: "code",
      currency,
    });

    const amountStringWithCode = formatter.format(amount);
    const amountString = amountStringWithCode.split(
      String.fromCharCode(160) // &nbsp (UTF 160) separates the code and the amount
    )[1];

    return amountString;
  };

  return { convert, format };
};

export default usePrice;
