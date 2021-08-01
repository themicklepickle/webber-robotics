import "./budget.css";

import { Fab, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import Item from "./Item/Item";
import CreateItem from "./CreateItem/CreateItem";
import Loading from "../../components/Loading";

import { useQuery } from "@apollo/client";
import ITEMS from "../../graphql/queries/items";

import useBudget from "./useBudget";

const addItem = () => {};
const deleteItem = () => {};
const updateItem = () => {};

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

        {data.items.map((item, index) => {
          return (
            <Item
              key={index}
              {...item}
              deleteItem={() => deleteItem(index)}
              updateItem={(newItem) => updateItem(newItem, index)}
            />
          );
        })}
      </div>

      <div className="button-section">
        <Fab color="primary" onClick={openCreateItem}>
          <AddIcon />
        </Fab>
      </div>

      <CreateItem
        isOpen={createItemIsVisible}
        close={closeCreateItem}
        addItem={addItem}
      />
    </div>
  );
};

export default Budget;
