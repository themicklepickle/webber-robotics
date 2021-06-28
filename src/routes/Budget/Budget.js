import "./budget.css";

import { Fab, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { Dialog } from "@material-ui/core";

import Item from "./Item/Item";

import useBudget from "./useBudget";

const Budget = ({ name }) => {
  const { items, addItem, deleteItem, updateItem } = useBudget();

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
        <Fab color="secondary" onClick={() => addItem(items[0])}>
          <AddIcon />
        </Fab>
      </div>

      <Dialog open={false}></Dialog>
    </div>
  );
};

export default Budget;
