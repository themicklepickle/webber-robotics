import { gql } from "@apollo/client";

const EXCHANGE_RATE = gql`
  query GetExchangeRate(
    $fromCurrency: String!
    $toCurrency: String!
    $date: String
  ) {
    exchangeRate(
      fromCurrency: $fromCurrency
      toCurrency: $toCurrency
      date: $date
    ) {
      rate
    }
  }
`;

export default EXCHANGE_RATE;
