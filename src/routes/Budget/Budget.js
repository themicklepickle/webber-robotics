import "./budget.css";
import Item from "./Item/Item";
import { Fab, Typography } from "@material-ui/core";
import Adder from "./Adder/Adder";
import AddIcon from "@material-ui/icons/Add";

import useBudget from "./useBudget";
import { green } from "@material-ui/core/colors";
import { Dialog } from "@material-ui/core";

const Budget = (props) => {
  const [items, addItem, deleteItem, updateItem] = useBudget(props);

  return (
    <div className="wrapper">
      <div>
        <div className="title">
          <Typography variant="h4">Build Team Purchase List</Typography>
        </div>

        {items.map((item, index) => {
          return (
            <Item
              key={index}
              {...item}
              itemIndex={index}
              deleteItem={deleteItem}
              updateItem={updateItem}
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
      {/* <Adder addItem={addItem} /> */}
    </div>
  );
};

export default Budget;
