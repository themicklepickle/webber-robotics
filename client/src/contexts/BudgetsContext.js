import { createContext } from "react";

const BudgetsContext = createContext({
  expenditures: [],
  setExpenditures: () => {},
});

export default BudgetsContext;
