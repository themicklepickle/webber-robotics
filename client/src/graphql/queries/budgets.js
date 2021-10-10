import { gql } from "@apollo/client";

const BUDGETS = gql`
  query GetBudgets {
    budgets {
      id
      name
    }
  }
`;

export default BUDGETS;
