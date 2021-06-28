import React from "react";

import "./item.css";
import { Grid, Box, Paper, IconButton } from "@material-ui/core";
import IsPurchasedCheckBox from "./IsPurchasedCheckBox/IsPurchasedCheckBox";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import Priority from "./Priority/Priority";
import Vendor from "./Vendor/Vendor";
import Price from "./Price/Price";

import useItem from "./useItem";
import QuantitySelect from "./QuantitySelect/QuantitySelect";

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

const Item = (props) => {
  const [
    isPurchased,
    datePurchased,
    check,
    uncheck,
    quantity,
    setQuantity,
    deleteItem,
  ] = useItem(props);

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
          <Box fontWeight="fontWeightBold">{props.name}</Box>
        </Grid>
        <Grid item xs={1}>
          <Priority priorityLevel={props.priority} />
        </Grid>
        {/* <Grid item xs={5}>
          {props.description}
        </Grid> */}
        <Grid item xs={2}>
          <Vendor
            vendorName={props.vendor.name}
            vendorLogo={props.vendor.logo}
            url={props.url}
          />
        </Grid>
        <Grid item xs={2}>
          <Box fontWeight="fontWeightLight">
            <Price
              amount={props.unitPrice}
              currency={props.unitPriceCurrency}
            />
          </Box>
        </Grid>
        <Grid item xs={1}>
          {/* <Box
            fontWeight="fontWeightLight"
            fontStyle="italic"
          >{`x${props.quantity}`}</Box> */}
          <QuantitySelect quantity={quantity} setQuantity={setQuantity} />
        </Grid>
        <Grid item xs={2}>
          <Box fontWeight="fontWeightBold">
            <Price
              amount={props.unitPrice * quantity}
              currency={props.unitPriceCurrency}
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
