import { Fab, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { Item, CreateItem, Loading, Error } from "../components";

import { useQuery } from "@apollo/client";
import { BUDGET_AND_ITEMS } from "../graphql/queries";

import { useParams } from "react-router-dom";

import { useBudget } from "../hooks";
import { styled } from "@mui/system";

const ButtonSection = styled("div")({
  marginTop: "10em",
  marginBottom: "5em",
  textAlign: "center",
});

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

        {data.budget.items.map((item) => {
          return <Item key={item.id} {...item} />;
        })}
      </div>

      <ButtonSection>
        <Fab color="primary" onClick={openCreateItem}>
          <AddIcon />
        </Fab>
      </ButtonSection>

      <CreateItem
        isOpen={createItemIsVisible}
        closeModal={closeCreateItem}
        budgetId={budgetId}
      />
    </>
  );
};

export default Budget;
