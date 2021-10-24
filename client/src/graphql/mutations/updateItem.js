import { gql } from "@apollo/client";

const UPDATE_ITEM = gql`
  mutation UpdateItem(
    $id: ID!
    $name: String
    $priority: String
    $description: String
    $quantity: Int
    $unitPrice: Float
    $unitPriceCurrency: String
    $isPurchased: Boolean
    $datePurchased: String
    $url: String
    $vendor: VendorUpdateInput = {}
  ) {
    updateItem(
      id: $id
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
      }
    ) {
      name
      vendor {
        id
      }
    }
  }
`;

export default UPDATE_ITEM;
