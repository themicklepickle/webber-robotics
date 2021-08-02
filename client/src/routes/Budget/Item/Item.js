import "./item.css";

import { Grid, Box, Paper, IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import Priority from "./Priority/Priority";
import Vendor from "./Vendor/Vendor";
import Price from "./Price/Price";
import QuantitySelect from "./QuantitySelect/QuantitySelect";
import IsPurchasedCheckBox from "./IsPurchasedCheckBox/IsPurchasedCheckBox";

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
  quantity,
  unitPrice,
  unitPriceCurrency,
  isPurchased,
  datePurchased,
  url,
  vendor,
}) => {
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
          <QuantitySelect itemId={id} initialQuantity={quantity} />
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
