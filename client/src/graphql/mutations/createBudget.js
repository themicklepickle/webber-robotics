import { gql } from "@apollo/client";

const CREATE_BUDGET = gql`
  mutation CreateBudget($name: String!) {
    createBudget(budget: { name: $name }) {
      name
    }
  }
`;

export default CREATE_BUDGET;
