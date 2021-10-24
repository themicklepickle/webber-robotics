import { useQuery } from "@apollo/client";
import {
  Loading,
  Error,
  BudgetCard,
  CreateBudget,
  Header,
  AddButton,
  EditBudget,
} from "../components";
import { BUDGETS } from "../graphql/queries";
import { useRouteMatch, Switch, Route, Link } from "react-router-dom";
import { Budget } from ".";
import { useEffect, useState } from "react";
import { BudgetsContext } from "../contexts";
import { usePrice } from "../hooks";

const Budgets = () => {
  const { loading, error, data } = useQuery(BUDGETS);
  const [expenditures, setExpenditures] = useState({});
  const [createBudgetIsVisible, setCreateBudgetIsVisible] = useState(false);
  const [editBudgetIsVisible, setEditBudgetIsVisible] = useState(false);
  const [editProps, setEditProps] = useState({});
  // const [editName, setEditName] = useState("");
  // const [editAmount, setEditAmount] = useState(null);
  // const [editBudgetId, setEditBudgetId] = useState(null);
  const { convert } = usePrice();
  let match = useRouteMatch();

  useEffect(() => {
    const calculateExpenditures = async () => {
      if (!data?.budgets) return;
      for (const budget of data.budgets) {
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
    };

    calculateExpenditures();
  }, [data, convert]);

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
            <Header title="Budgets" />

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
                    editFn={() => {
                      setEditBudgetIsVisible(true);
                      setEditProps(budget);
                      // setEditName(budget.name);
                      // setEditAmount(budget.amount);
                      // setEditBudgetId(budget.id);
                    }}
                  />
                </Link>
              );
            })}

            <AddButton onClick={() => setCreateBudgetIsVisible(true)} />

            <CreateBudget
              isOpen={createBudgetIsVisible}
              closeModal={() => setCreateBudgetIsVisible(false)}
            />
            <EditBudget
              isOpen={editBudgetIsVisible}
              closeModal={() => setEditBudgetIsVisible(false)}
              {...editProps}
              setName={(name) =>
                setEditProps((editProps) => ({ ...editProps, name }))
              }
              setAmount={(amount) =>
                setEditProps((editProps) => ({ ...editProps, amount }))
              }
            />
          </Route>
        </Switch>
      </div>
    </BudgetsContext.Provider>
  );
};

export default Budgets;
