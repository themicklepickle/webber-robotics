import { useContext } from "react";

import { useMutation } from "@apollo/client";
import { CREATE_ITEM } from "../graphql/mutations";
import { QuantitySelect } from ".";
import {
  Button,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
  Typography,
  Slider,
  Switch,
} from "@material-ui/core";
import { DatePicker } from "@material-ui/lab";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";

import { CreateItemContext } from "../contexts";

const priorities = ["Low", "Medium", "High"]; // ENUM

const calculatePriorityValue = (prioritiesArray, index) => {
  return (100 / (prioritiesArray.length - 1)) * index;
};

const calculatePriorityLevel = (value, prioritiesArray) => {
  const index = value / (100 / (prioritiesArray.length - 1));

  return prioritiesArray[index];
};

const CreateItemFinalize = () => {
  const [createItem] = useMutation(CREATE_ITEM, {
    refetchQueries: ["GetBudgetAndItems"],
  });
  const { previousStep, itemDetails, close, setItemDetail } =
    useContext(CreateItemContext);

  return (
    <>
      <DialogContent>
        <Grid container spacing={3} direction="column">
          <Grid item container xs={12} alignItems="center">
            <Grid item xs={3}>
              <Typography>Quantity</Typography>
            </Grid>
            <Grid item xs={2}>
              <QuantitySelect
                quantity={itemDetails.quantity}
                setQuantity={async (newQuantity) => {
                  setItemDetail("quantity", parseFloat(newQuantity));
                }}
              />
            </Grid>
          </Grid>

          <Grid item container xs={12} alignItems="center">
            <Grid item xs={3}>
              <Typography>Priority</Typography>
            </Grid>
            <Grid item xs={9}>
              <Slider
                name="quantity"
                value={calculatePriorityValue(
                  priorities,
                  priorities.indexOf(itemDetails.priority)
                )}
                onChange={async (e, newPriorityValue) => {
                  const newPriorityLevel = calculatePriorityLevel(
                    newPriorityValue,
                    priorities
                  );

                  setItemDetail("priority", newPriorityLevel);
                }}
                marks={priorities.map((priority, idx, array) => ({
                  value: calculatePriorityValue(array, idx),
                  label: priority,
                }))}
                step={null}
                track={false}
              />
            </Grid>
          </Grid>

          <Grid item container xs={12} alignItems="center">
            <Grid item xs={3}>
              <Typography>Purchased</Typography>
            </Grid>
            <Grid item xs={2}>
              <Switch
                name="isPurchased"
                checked={itemDetails.isPurchased}
                onChange={async (e) => {
                  if (!e.target.checked) setItemDetail("datePurchased", "");
                  setItemDetail("isPurchased", e.target.checked);
                }}
                edge="start"
              />
            </Grid>
            <Grid item xs={7}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  disabled={!itemDetails.isPurchased}
                  label="Date Purchased"
                  name="datePurchased"
                  value={itemDetails.datePurchased}
                  onChange={async (newDatePurchased) => {
                    setItemDetail("datePurchased", newDatePurchased);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Grid container alignItems="center">
          <Grid item>
            <Button onClick={close} color="secondary">
              Cancel
            </Button>
          </Grid>
          <Grid item marginLeft="auto">
            <Button onClick={previousStep}>Back</Button>
          </Grid>
          <Grid item>
            <Button
              onClick={() => {
                createItem({
                  variables: itemDetails,
                });
                close();
              }}
            >
              Add Item
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </>
  );
};

export default CreateItemFinalize;

// make usePrioritySlider
