import { gql } from "@apollo/client";

const BUDGETS = gql`
  query GetBudgets {
    budgets {
      id
      name
      amount
    }
  }
`;

export default BUDGETS;
