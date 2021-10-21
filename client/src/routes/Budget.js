import { Grow, Tooltip } from "@mui/material";
import { tooltipClasses } from "@mui/material/Tooltip";
import { CreateItem, Loading, Error, Price } from "../components";
import { useQuery } from "@apollo/client";
import { BUDGET_AND_ITEMS } from "../graphql/queries";
import { useParams } from "react-router-dom";
import { useBudget } from "../hooks";
import { styled } from "@mui/system";
import { AddButton, BudgetProgress } from "../components";
import { useContext } from "react";
import { BudgetsContext } from "../contexts";
import { Item, Header } from "../components";

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip
    {...props}
    classes={{ popper: className }}
    TransitionComponent={Grow}
    TransitionProps={{ timeout: 300 }}
  />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 14,
    maxWidth: "100%",
    marginTop: "1px",
  },
}));

const Budget = () => {
  const { budgetId } = useParams();
  const { createItemIsVisible, openCreateItem, closeCreateItem } = useBudget();
  const { loading, error, data } = useQuery(BUDGET_AND_ITEMS, {
    variables: { id: budgetId },
  });
  const { expenditures } = useContext(BudgetsContext);
  const expenditure = expenditures[budgetId];

  if (loading) return <Loading />;
  if (error) return <Error />;

  const remaining = data.budget.amount - expenditure;

  return (
    <>
      <Header title={data.budget.name}>
        <LightTooltip
          title={
            <div style={{ textAlign: "center" }}>
              <Price amount={expenditure} currency="CAD" /> spent of{" "}
              <Price amount={data.budget.amount} currency="CAD" /> (
              <Price amount={remaining} currency="CAD" /> remaining)
            </div>
          }
        >
          <BudgetProgress
            amount={data.budget.amount}
            expenditure={expenditure}
            style={{
              marginTop: "2em",
            }}
          />
        </LightTooltip>
      </Header>

      {data.budget.items.map((item) => {
        return <Item key={item.id} {...item} />;
      })}

      <AddButton onClick={openCreateItem} />

      <CreateItem
        isOpen={createItemIsVisible}
        closeModal={closeCreateItem}
        budgetId={budgetId}
      />
    </>
  );
};

export default Budget;
