import { gql } from "@apollo/client";

const DELETE_BUDGET = gql`
  mutation DeleteBudget($id: ID!) {
    deleteBudget(id: $id) {
      id
    }
  }
`;

export default DELETE_BUDGET;
