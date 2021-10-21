import { useQuery } from "@apollo/client";
import { Loading, Error, CreateBudget } from "../components";
import BudgetCard from "../components/BudgetCard";
import { BUDGETS } from "../graphql/queries";
import { useRouteMatch, Switch, Route, Link } from "react-router-dom";
import { Budget } from ".";
import { useEffect, useState } from "react";
import { BudgetsContext } from "../contexts";

const Budgets = () => {
  const { loading, error, data } = useQuery(BUDGETS);
  const [expenditures, setExpenditures] = useState({});
  let match = useRouteMatch();

  useEffect(() => {
    data?.budgets.forEach((budget) => {
      const expenditure = budget.items.reduce(
        (total, { isPurchased, unitPrice, unitPriceCurrency, quantity }) =>
          isPurchased ? total + unitPrice * quantity : 0,
        0
      );
      setExpenditures((expenditures) =>
        Object.assign({ ...expenditures }, { [budget.id]: expenditure })
      );
    });
  }, [data]);

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <BudgetsContext.Provider
      value={{
        expenditures,
        setExpenditures,
      }}
    >
      <div>
        <Switch>
          <Route path={`${match.path}/:budgetId`}>
            <Budget />
          </Route>
          <Route path={match.path}>
            <CreateBudget />

            {data.budgets.map((budget) => {
              return (
                <Link
                  to={`${match.url}/${budget.id}`}
                  style={{ textDecoration: "none" }}
                  key={budget.id}
                >
                  <BudgetCard
                    url={match.url}
                    {...budget}
                    expenditures={expenditures[budget.id]}
                  />
                </Link>
              );
            })}
          </Route>
        </Switch>
      </div>
    </BudgetsContext.Provider>
  );
};

export default Budgets;
