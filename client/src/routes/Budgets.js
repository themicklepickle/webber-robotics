import { useQuery } from "@apollo/client";
import { Loading, Error, CreateBudget } from "../components";
import BudgetCard from "../components/BudgetCard";
import { BUDGETS } from "../graphql/queries";
import { useRouteMatch, Switch, Route, Link } from "react-router-dom";
import { Budget } from ".";
import { useEffect, useState } from "react";

const Budgets = () => {
  const { loading, error, data } = useQuery(BUDGETS);
  const [progress, setProgress] = useState({});
  let match = useRouteMatch();

  useEffect(() => {
    data?.budgets.forEach((budget) => {
      const expenditures = budget.items.reduce(
        (total, { isPurchased, unitPrice, unitPriceCurrency, quantity }) =>
          isPurchased ? total + unitPrice * quantity : 0,
        0
      );
      console.log(expenditures);
      let newProgress = {};
      newProgress[budget.id] = expenditures;
      setProgress((progress) => Object.assign({ ...progress }, newProgress));
    });
  }, [data]);

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
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
                  expenditures={progress[budget.id]}
                />
              </Link>
            );
          })}
        </Route>
      </Switch>
    </div>
  );
};

export default Budgets;
