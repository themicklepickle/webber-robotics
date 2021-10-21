import { gql } from "@apollo/client";

const CREATE_BUDGET = gql`
  mutation CreateBudget($name: String!, $amount: Float!) {
    createBudget(budget: { name: $name, amount: $amount }) {
      name
      amount
    }
  }
`;

export default CREATE_BUDGET;
