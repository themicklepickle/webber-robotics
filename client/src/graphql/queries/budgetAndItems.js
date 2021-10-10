import { gql } from "@apollo/client";

const BUDGET_AND_ITEMS = gql`
  query GetBudgetAndItems($id: ID!) {
    budget(id: $id) {
      name
      items {
        id
        name
        priority
        description
        quantity
        unitPrice
        unitPriceCurrency
        isPurchased
        datePurchased
        url
        vendor {
          id
          name
          logo
        }
      }
    }
  }
`;

export default BUDGET_AND_ITEMS;
