import { gql } from "@apollo/client";

const DELETE_ITEM = gql`
  mutation DeleteItem($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

export default DELETE_ITEM;
