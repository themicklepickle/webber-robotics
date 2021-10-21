import { useQuery } from "@apollo/client";
import { Loading, Error, CreateBudget } from "../components";
import BudgetCard from "../components/BudgetCard";
import { BUDGETS } from "../graphql/queries";
import { useRouteMatch, Switch, Route, Link } from "react-router-dom";
import { Budget } from ".";
import { useEffect, useState } from "react";
import { BudgetsContext } from "../contexts";
import { usePrice } from "../hooks";

const Budgets = () => {
  const { loading, error, data } = useQuery(BUDGETS);
  const [expenditures, setExpenditures] = useState({});
  const { convert } = usePrice();
  let match = useRouteMatch();

  useEffect(() => {
    const calculateExpenditures = async () => {
      if (!data?.budgets) return;
      for (const budget of data.budgets) {
        console.log(budget.name);
        let expenditure = 0;
        for (const {
          isPurchased,
          unitPrice,
          unitPriceCurrency,
          quantity,
        } of budget.items) {
          if (!isPurchased) continue;
          if (unitPriceCurrency === "CAD") {
            expenditure += unitPrice * quantity;
            continue;
          }
          const convertedAmount = await convert(
            unitPrice,
            unitPriceCurrency,
            "CAD"
          );
          expenditure += convertedAmount * quantity;
        }
        setExpenditures((expenditures) =>
          Object.assign({ ...expenditures }, { [budget.id]: expenditure })
        );
      }

      // data?.budgets.forEach(async (budget) => {
      //   const expenditure = await budget.items.reduce(
      //     async (
      //       total,
      //       { isPurchased, unitPrice, unitPriceCurrency, quantity }
      //     ) => {
      //       if (!isPurchased) return total;
      //       if (unitPriceCurrency === "CAD")
      //         return unitPrice * quantity + total;

      //       console.log("hello");
      //       const convertedAmount = await convert(
      //         unitPrice,
      //         unitPriceCurrency,
      //         "CAD"
      //       );
      //       return convertedAmount * quantity + total;
      //     },
      //     0
      //   );
      //   setExpenditures((expenditures) =>
      //     Object.assign({ ...expenditures }, { [budget.id]: expenditure })
      //   );
      // });
    };

    calculateExpenditures();
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
