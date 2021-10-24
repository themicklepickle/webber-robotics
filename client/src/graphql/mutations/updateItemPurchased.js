import { gql } from "@apollo/client";

const UPDATE_ITEM_PURCHASED = gql`
  mutation UpdateItemPurchased(
    $id: ID!
    $isPurchased: Boolean!
    $datePurchased: String!
  ) {
    updateItem(
      id: $id
      item: { isPurchased: $isPurchased, datePurchased: $datePurchased }
    ) {
      name
    }
  }
`;

export default UPDATE_ITEM_PURCHASED;
