import { exchangeRates } from "exchange-rates-api";

const exchangeRateQueries = {
  exchangeRate: async (_, { fromCurrency, toCurrency, date }) => {
    const instance = exchangeRates();
    instance.setApiBaseUrl("https://api.exchangerate.host");

    if (date === undefined) {
      instance.latest();
    } else {
      instance.at(date);
    }

    const rate = await instance.base(fromCurrency).symbols(toCurrency).fetch();
    console.log(rate);

    return { rate };
  },
};

export default exchangeRateQueries;
