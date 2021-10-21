import { createContext } from "react";

const BudgetsContext = createContext({
  budgets: [],
  setBudgets: () => {},
});

export default BudgetsContext;
