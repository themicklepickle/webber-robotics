import { useContext, useState, useEffect } from "react";

import { CreateItemContext } from "../contexts";

import { shortCurrencyList, longCurrencyList } from "../utils/currencyLists";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  MenuItem,
  Grid,
  InputAdornment,
  Autocomplete,
} from "@mui/material";
import CustomTextField from "./CustomTextfield";

import getSymbolFromCurrency from "currency-symbol-map";

const validateItemDetails = (
  { name, url, vendor, currency, unitPrice },
  setErrors
) => {
  const newErrors = {
    name: name === "",
    description: false,
    url: url === "",
    vendor: !vendor || vendor.name === "",
    currency: currency === "",
    unitPrice: unitPrice <= 0,
  };

  setErrors(newErrors);

  return Object.values(newErrors).every((value) => value === false);
};

const autocompleteVendors = async (vendorInputValue, setSuggestedVendors) => {
  if (!vendorInputValue || vendorInputValue.charAt(0) === " ") {
    setSuggestedVendors([]);
    return;
  }

  const response = await fetch(
    `https://autocomplete.clearbit.com/v1/companies/suggest?query=${vendorInputValue}`
  );
  const result = await response.json();

  if (result.message) return; // API error

  // Remove domain attribute and duplicate names
  const seen = new Set();
  const suggestions = result
    .map(({ domain, ...vendor }) => vendor)
    .filter((vendor) => {
      const duplicate = seen.has(vendor.name);
      seen.add(vendor.name);
      return !duplicate;
    });

  setSuggestedVendors(suggestions);
};

const CreateItemForm = () => {
  const [currencies, setCurrencies] = useState(shortCurrencyList);
  const [currencySelectIsOpen, setCurrencySelectIsOpen] = useState(false);
  const [suggestedVendors, setSuggestedVendors] = useState([]);
  const [vendorInputValue, setVendorInputValue] = useState("");
  const {
    close,
    nextStep,
    previousStep,
    itemDetails,
    setItemDetail,
    setErrors,
  } = useContext(CreateItemContext);

  useEffect(() => {
    autocompleteVendors(vendorInputValue, setSuggestedVendors);
  }, [vendorInputValue]);

  useEffect(() => {
    setVendorInputValue(itemDetails.vendor?.name);
  }, [itemDetails.vendor?.name]);

  return (
    <>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <CustomTextField name="name" autoFocus />
          </Grid>

          <Grid item xs={12}>
            <CustomTextField name="description" multiline />
          </Grid>

          <Grid item xs={12}>
            <CustomTextField name="url" label="URL" />
          </Grid>

          <Grid item xs={11}>
            <Autocomplete
              name="vendor"
              options={suggestedVendors}
              getOptionLabel={(vendor) => vendor.name}
              inputValue={vendorInputValue}
              onInputChange={async (e, newValue, reason) => {
                if (reason === "reset" && newValue === "") return;
                setVendorInputValue(newValue);
              }}
              onChange={async (e, newVendor) => {
                setItemDetail("vendor", newVendor);
              }}
              isOptionEqualToValue={(option, value) =>
                option.name === value.name
              }
              filterOptions={(x) => x}
              renderOption={(props, vendor) => (
                <Box component="li" {...props} key={vendor.name}>
                  <img
                    style={{
                      maxHeight: "2em",
                      maxWidth: "2em",
                      marginRight: "1em",
                    }}
                    src={vendor.logo}
                    alt={vendor.name}
                  />
                  {vendor.name}
                </Box>
              )}
              renderInput={(params) => (
                <CustomTextField name="vendor" onChange={null} {...params} />
              )}
            />
          </Grid>

          <Grid
            item
            xs={1}
            alignSelf="flex-end"
            style={{ padding: "0 0 0 0.5em " }}
          >
            <img
              style={{ maxWidth: "100%" }}
              src={itemDetails.vendor?.logo}
              alt={itemDetails.vendor?.name}
            />
          </Grid>

          <Grid item xs={6}>
            <CustomTextField
              name="unitPriceCurrency"
              select
              label="Currency"
              onChange={async (e) => {
                if (e.target.value === "more") {
                  setCurrencies(longCurrencyList);
                } else {
                  setItemDetail("unitPriceCurrency", e.target.value);
                  setCurrencySelectIsOpen(false);
                }
              }}
              onClickCapture={() => setCurrencySelectIsOpen(true)}
              SelectProps={{
                MenuProps: { onClose: () => setCurrencySelectIsOpen(true) },
                open: currencySelectIsOpen,
              }}
            >
              {currencies.list.map(({ code }) => (
                <MenuItem key={code} value={code}>
                  {code}
                </MenuItem>
              ))}
              {currencies.size === "short" && (
                <MenuItem key="more" value="more">
                  Show more...
                </MenuItem>
              )}
            </CustomTextField>
          </Grid>

          <Grid item xs={6}>
            <CustomTextField
              name="unitPrice"
              label="Unit Price"
              type="number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {getSymbolFromCurrency(itemDetails.unitPriceCurrency)}
                  </InputAdornment>
                ),
                inputProps: { min: 0.01, step: 0.01 },
              }}
            />
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
              onClick={() =>
                validateItemDetails(itemDetails, setErrors) && nextStep()
              }
            >
              Next
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </>
  );
};

export default CreateItemForm;

// TODO: make useToggle hook for currency select is open or not
