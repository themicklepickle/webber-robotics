import { gql } from "@apollo/client";

const UPDATE_ITEM_QUANTITY = gql`
  mutation UpdateItemPurchased($id: ID!, $quantity: Int!) {
    updateItem(id: $id, item: { quantity: $quantity }) {
      name
    }
  }
`;

export default UPDATE_ITEM_QUANTITY;
