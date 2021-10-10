import { gql } from "@apollo/client";

const CREATE_ITEM = gql`
  mutation CreateItem(
    $name: String!
    $priority: String!
    $description: String
    $quantity: Int!
    $unitPrice: Float!
    $unitPriceCurrency: String!
    $isPurchased: Boolean!
    $datePurchased: String!
    $url: String!
    $vendor: VendorCreateInput!
    $budgetId: ID!
  ) {
    createItem(
      item: {
        name: $name
        priority: $priority
        description: $description
        quantity: $quantity
        unitPrice: $unitPrice
        unitPriceCurrency: $unitPriceCurrency
        isPurchased: $isPurchased
        datePurchased: $datePurchased
        url: $url
        vendor: $vendor
        budget: $budgetId
      }
    ) {
      name
    }
  }
`;

export default CREATE_ITEM;
