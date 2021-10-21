import { useQuery } from "@apollo/client";
import { Loading, Error, CreateBudget } from "../components";
import BudgetCard from "../components/BudgetCard";
import { BUDGETS } from "../graphql/queries";
import { useRouteMatch, Switch, Route, Link } from "react-router-dom";
import { Budget } from ".";

const Budgets = () => {
  const { loading, error, data } = useQuery(BUDGETS);
  let match = useRouteMatch();

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
                <BudgetCard url={match.url} {...budget} />
              </Link>
            );
          })}
        </Route>
      </Switch>
    </div>
  );
};

export default Budgets;
