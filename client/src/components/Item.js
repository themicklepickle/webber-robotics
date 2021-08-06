import "../styles/item.css";

import { Grid, Box, Paper, IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import Priority from "../components/Priority";
import Vendor from "../components/Vendor";
import Price from "../components/Price";
import QuantitySelect from "../components/QuantitySelect";
import IsPurchasedCheckBox from "../components/IsPurchasedCheckBox";

import useItem from "../hooks/useItem";

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
        <Grid item xs={2} border="1">
          <Box {...classes.border}>
            <IconButton>
              <EditIcon></EditIcon>
            </IconButton>
            <IconButton>
              <DeleteIcon></DeleteIcon>
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Item;
