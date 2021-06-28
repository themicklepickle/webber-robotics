import "./item.css";

import { Grid, Box, Paper, IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import Priority from "./Priority/Priority";
import Vendor from "./Vendor/Vendor";
import Price from "./Price/Price";
import QuantitySelect from "./QuantitySelect/QuantitySelect";
import IsPurchasedCheckBox from "./IsPurchasedCheckBox/IsPurchasedCheckBox";

import useItem from "./useItem";

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
  itemIndex,
  deleteItem,
  name,
  priority,
  vendor,
  url,
  description,
  unitPrice,
  unitPriceCurrency,
  ...restProps
}) => {
  const itemToJSON = () => ({
    name,
    priority,
    description,
    vendor,
    quantity,
    unitPrice,
    unitPriceCurrency,
    isPurchased,
    datePurchased,
    url,
  });

  const { isPurchased, datePurchased, check, uncheck, quantity, setQuantity } =
    useItem(restProps.isPurchased, restProps.datePurchased, restProps.quantity);

  return (
    <Paper>
      <Grid
        container
        direction="row"
        // justify="space-between"
        alignItems="center"
        columns={16}
        style={classes.paper}
      >
        <Grid item xs={1}>
          <IsPurchasedCheckBox
            isChecked={isPurchased}
            datePurchased={datePurchased}
            check={check}
            uncheck={uncheck}
          />
        </Grid>
        <Grid item xs={5}>
          <Box fontWeight="fontWeightBold">{name}</Box>
        </Grid>
        <Grid item xs={1}>
          <Priority priorityLevel={priority} />
        </Grid>
        {/* <Grid item xs={5}>
          {description}
        </Grid> */}
        <Grid item xs={2}>
          <Vendor vendorName={vendor.name} vendorLogo={vendor.logo} url={url} />
        </Grid>
        <Grid item xs={2}>
          <Box fontWeight="fontWeightLight">
            <Price amount={unitPrice} currency={unitPriceCurrency} />
          </Box>
        </Grid>
        <Grid item xs={1}>
          {/* <Box
            fontWeight="fontWeightLight"
            fontStyle="italic"
          >{`x${quantity}`}</Box> */}
          <QuantitySelect quantity={quantity} setQuantity={setQuantity} />
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
            <IconButton onClick={deleteItem}>
              <DeleteIcon></DeleteIcon>
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Item;
