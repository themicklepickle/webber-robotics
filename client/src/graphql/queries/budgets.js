import { gql } from "@apollo/client";

const BUDGETS = gql`
  query GetBudgets {
    budgets {
      id
      name
      amount
      items {
        isPurchased
        unitPrice
        unitPriceCurrency
        quantity
      }
    }
  }
`;

export default BUDGETS;
