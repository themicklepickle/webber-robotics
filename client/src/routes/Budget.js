import { Typography } from "@mui/material";

import { Item, CreateItem, Loading, Error } from "../components";

import { useQuery } from "@apollo/client";
import { BUDGET_AND_ITEMS } from "../graphql/queries";

import { useParams } from "react-router-dom";

import { useBudget } from "../hooks";
import { styled } from "@mui/system";
import { AddButton, BudgetProgress } from "../components";

const Title = styled("div")({
  marginTop: "2em",
  padding: "1em",
  textAlign: "center",
});

const Budget = () => {
  const { budgetId } = useParams();
  const { createItemIsVisible, openCreateItem, closeCreateItem } = useBudget();
  const { loading, error, data } = useQuery(BUDGET_AND_ITEMS, {
    variables: { id: budgetId },
  });

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <>
      <div>
        <Title>
          <Typography variant="h4">{data.budget.name}</Typography>
        </Title>
        <BudgetProgress />

        {data.budget.items.map((item) => {
          return <Item key={item.id} {...item} />;
        })}
      </div>

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
