import {
  // Alert,
  Box,
  Button,
  // CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  MenuItem,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
  InputAdornment,
  Slider,
  Switch,
  Autocomplete,
} from "@material-ui/core";
import { DatePicker } from "@material-ui/lab";
import { SearchRounded } from "@material-ui/icons";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";

import getSymbolFromCurrency from "currency-symbol-map";

import { QuantitySelect, ItemSearchResults } from "../components";
import { useStep, useCreateItem } from "../hooks";

const CreateItem = ({ isOpen, close }) => {
  const { step, nextStep, previousStep, setInitialStep } = useStep(3);
  const {
    reset,
    searchURL,
    setSearchURL,
    search,
    currencies,
    currencySelectIsOpen,
    openCurrencySelect,
    closeCurrencySelect,
    handleUnitPriceCurrencyChange,
    formValues,
    setQuantity,
    executeCreateItem,
    handleDatePurchasedChange,
    getPriorityMarks,
    handlePriorityChange,
    getPriorityValue,
    handleIsPurchasedChange,
    suggestedVendors,
    vendorInputValue,
    handleVendorInputChange,
    handleVendorChange,
    getTextFieldProps,
    validateItemDetails,
    renderSearch,
    update,
  } = useCreateItem(setInitialStep);

  const cancelButton = (
    <Button onClick={close} color="secondary">
      Cancel
    </Button>
  );

  const firstPage = (
    <>
      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          autoComplete="off"
          spellCheck={false}
          variant="standard"
          id="itemURL"
          label="Item URL"
          value={searchURL}
          onChange={(e) => setSearchURL(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && search()}
          InputProps={{
            endAdornment: (
              <IconButton onClick={search}>
                <SearchRounded />
              </IconButton>
            ),
          }}
          style={{ marginBottom: "0.5em" }}
        />
        {renderSearch && (
          <ItemSearchResults
            url={searchURL}
            select={(item) => {
              nextStep();
              update(item);
            }}
          />
        )}
      </DialogContent>

      <DialogActions>
        <Grid container alignItems="center">
          <Grid item>{cancelButton}</Grid>
          <Grid item marginLeft="auto">
            <Button onClick={nextStep}>Enter Details Manually</Button>
          </Grid>
        </Grid>
      </DialogActions>
    </>
  );

  const secondPage = (
    <>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField {...getTextFieldProps("name")} autoFocus />
          </Grid>
          <Grid item xs={12}>
            <TextField {...getTextFieldProps("description")} multiline />
          </Grid>
          <Grid item xs={12}>
            <TextField {...getTextFieldProps("url")} label="URL" />
          </Grid>
          <Grid item xs={10}>
            <Autocomplete
              name="vendor"
              options={suggestedVendors}
              getOptionLabel={(vendor) => vendor.name}
              inputValue={vendorInputValue}
              onInputChange={handleVendorInputChange}
              onChange={handleVendorChange}
              isOptionEqualToValue={(option, value) =>
                option.domain === value.domain
              }
              filterOptions={(x) => x}
              renderOption={(props, vendor) => (
                <Box component="li" {...props} key={vendor.domain}>
                  <img
                    style={{
                      maxHeight: "2em",
                      maxWidth: "2em",
                      marginRight: "1em",
                    }}
                    src={vendor.logo}
                    alt={vendor.name}
                  />
                  {vendor.name} — {vendor.domain}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...getTextFieldProps("vendor", { onChange: true })}
                  {...params}
                />
              )}
            />
          </Grid>
          <Grid item xs={2} alignSelf="flex-end">
            <img
              style={{ maxWidth: "100%", maxHeight: "2em" }} // TODO: find a more elegant solution for restricting the logo height
              src={formValues.vendor?.logo}
              alt={formValues.vendor?.name}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              {...getTextFieldProps("unitPriceCurrency")}
              select
              label="Currency"
              onChange={handleUnitPriceCurrencyChange}
              onClickCapture={openCurrencySelect}
              SelectProps={{
                MenuProps: { onClose: closeCurrencySelect },
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
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              {...getTextFieldProps("unitPrice")}
              label="Unit Price"
              type="number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {getSymbolFromCurrency(formValues.unitPriceCurrency)}
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
          <Grid item>{cancelButton}</Grid>
          <Grid item marginLeft="auto">
            <Button onClick={previousStep}>Back</Button>
          </Grid>
          <Grid item>
            <Button onClick={() => validateItemDetails() && nextStep()}>
              Next
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </>
  );

  const thirdPage = (
    <>
      <DialogContent>
        <Grid container spacing={3} direction="column">
          <Grid item container xs={12} alignItems="center">
            <Grid item xs={3}>
              <Typography>Quantity</Typography>
            </Grid>
            <Grid item xs={2}>
              <QuantitySelect
                quantity={formValues.quantity}
                setQuantity={setQuantity}
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
                value={getPriorityValue()}
                onChange={handlePriorityChange}
                marks={getPriorityMarks()}
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
                value={formValues.isPurchased}
                onChange={handleIsPurchasedChange}
                edge="start"
              />
            </Grid>
            <Grid item xs={7}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  disabled={!formValues.isPurchased}
                  label="Date Purchased"
                  name="datePurchased"
                  value={formValues.datePurchased}
                  onChange={handleDatePurchasedChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Grid container alignItems="center">
          <Grid item>{cancelButton}</Grid>
          <Grid item marginLeft="auto">
            <Button onClick={previousStep}>Back</Button>
          </Grid>
          <Grid item>
            <Button
              onClick={() => {
                executeCreateItem();
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

  return (
    <Dialog
      open={isOpen}
      onClose={close}
      TransitionProps={{ onExited: reset }}
      fullWidth
    >
      <DialogTitle style={{ textAlign: "center" }}>
        <Box fontWeight={500}>Create Item</Box>
      </DialogTitle>
      {step === 1 && firstPage}
      {step === 2 && secondPage}
      {step === 3 && thirdPage}
    </Dialog>
  );
};

export default CreateItem;
