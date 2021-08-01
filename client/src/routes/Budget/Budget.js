import "./budget.css";

import { Fab, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import Item from "./Item/Item";
import CreateItem from "./CreateItem/CreateItem";

import useBudget from "./useBudget";

const addItem = () => {};
const deleteItem = () => {};
const updateItem = () => {};

const Budget = ({ name }) => {
  const { createItemIsVisible, openCreateItem, closeCreateItem } = useBudget();

  return (
    <div className="wrapper">
      <div>
        <div className="title">
          <Typography variant="h4">{name}</Typography>
        </div>

        {items.map((item, index) => {
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
