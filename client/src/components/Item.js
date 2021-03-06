import "../styles/item.css";

import { Grid, Box, Paper } from "@mui/material";

import {
  Priority,
  Vendor,
  Price,
  QuantitySelect,
  IsPurchasedCheckBox,
} from "../components";

import { DELETE_ITEM } from "../graphql/mutations";
import { useMutation } from "@apollo/client";

import { useItem } from "../hooks";
import EditDeleteActions from "./EditDeleteActions";

const classes = {
  paper: {
    padding: "0.5em 0",
    margin: "1em 0",
    textAlign: "center",
  },
  border: {
    bgcolor: "background.paper",
    borderLeft: 1,
    borderColor: "darkgrey",
  },
};

const Item = ({
  id,
  name,
  priority,
  description,
  unitPrice,
  unitPriceCurrency,
  isPurchased,
  datePurchased,
  url,
  vendor,
  ...initialProps
}) => {
  const { quantity, updateQuantity } = useItem(id, initialProps.quantity);
  const [deleteItem] = useMutation(DELETE_ITEM, {
    variables: { id },
    refetchQueries: ["GetBudgets", "GetBudgetAndItems"],
  });

  return (
    <Paper>
      <Grid
        container
        direction="row"
        alignItems="center"
        columns={16}
        style={classes.paper}
      >
        <Grid item xs={1}>
          <IsPurchasedCheckBox
            itemId={id}
            initialIsChecked={isPurchased}
            initialDatePurchased={datePurchased}
          />
        </Grid>
        <Grid item xs={5}>
          <Box fontWeight="fontWeightBold">{name}</Box>
        </Grid>
        <Grid item xs={1}>
          <Priority priorityLevel={priority} />
        </Grid>
        <Grid item xs={2}>
          <Vendor
            vendorName={vendor?.name}
            vendorLogo={vendor?.logo}
            url={url}
          />
        </Grid>
        <Grid item xs={2}>
          <Box fontWeight="fontWeightLight">
            <Price amount={unitPrice} currency={unitPriceCurrency} />
          </Box>
        </Grid>
        <Grid item xs={1}>
          <QuantitySelect quantity={quantity} setQuantity={updateQuantity} />
        </Grid>
        <Grid item xs={2}>
          <Box fontWeight="fontWeightBold">
            <Price
              amount={unitPrice * quantity}
              currency={unitPriceCurrency}
              newCurrency={"CAD"}
              date={datePurchased}
            />
          </Box>
        </Grid>
        <Grid item xs={2}>
          <EditDeleteActions deleteFn={deleteItem} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Item;
