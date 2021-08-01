import { gql } from "@apollo/client";

const ITEMS = gql`
  query GetItems {
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
        domain
        logo
      }
    }
  }
`;

export default ITEMS;
