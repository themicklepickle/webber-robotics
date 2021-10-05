import "../styles/budget.css";

import { Fab, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import { Item, CreateItem, Loading } from "../components";

import { useQuery } from "@apollo/client";
import { ITEMS } from "../graphql/queries";

import { useBudget } from "../hooks";

const Budget = ({ name }) => {
  const { createItemIsVisible, openCreateItem, closeCreateItem } = useBudget();
  const { loading, error, data } = useQuery(ITEMS);

  if (loading) return <Loading />;
  if (error) return <div>Error fetching items :(</div>;

  return (
    <div className="wrapper">
      <div>
        <div className="title">
          <Typography variant="h4">{name}</Typography>
        </div>

        {data.items.map((item) => {
          return <Item key={item.id} {...item} />;
        })}
      </div>

      <div className="button-section">
        <Fab color="primary" onClick={openCreateItem}>
          <AddIcon />
        </Fab>
      </div>

      <CreateItem isOpen={createItemIsVisible} closeModal={closeCreateItem} />
    </div>
  );
};

export default Budget;
