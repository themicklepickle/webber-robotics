import { gql } from "@apollo/client";

const UPDATE_BUDGET = gql`
  mutation UpdateBudget($id: ID!, $name: String, $amount: Float) {
    updateBudget(id: $id, budget: { name: $name, amount: $amount }) {
      name
    }
  }
`;

export default UPDATE_BUDGET;
