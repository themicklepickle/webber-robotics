import "../styles/budget.css";

import { Fab, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { Item, CreateItem, Loading, Error } from "../components";

import { useQuery } from "@apollo/client";
import { BUDGET_AND_ITEMS } from "../graphql/queries";

import { useParams } from "react-router-dom";

import { useBudget } from "../hooks";

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
        <div className="title">
          <Typography variant="h4">{data.budget.name}</Typography>
        </div>

        {data.budget.items.map((item) => {
          return <Item key={item.id} {...item} />;
        })}
      </div>

      <div className="button-section">
        <Fab color="primary" onClick={openCreateItem}>
          <AddIcon />
        </Fab>
      </div>

      <CreateItem
        isOpen={createItemIsVisible}
        closeModal={closeCreateItem}
        budgetId={budgetId}
      />
    </>
  );
};

export default Budget;
