import { exchangeRates } from "exchange-rates-api";

const usePrice = () => {
  const convert = async (amount, fromCurrency, toCurrency, date) => {
    const instance = exchangeRates();
    instance.setApiBaseUrl("https://api.exchangerate.host");

    if (date === "latest") {
      instance.latest();
    } else {
      instance.at(date);
    }

    const rate = await instance.base(fromCurrency).symbols(toCurrency).fetch();

    return rate * amount;
  };

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
