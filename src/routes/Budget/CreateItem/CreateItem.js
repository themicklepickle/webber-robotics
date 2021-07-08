import {
  Alert,
  Box,
  Button,
  CircularProgress,
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
} from "@material-ui/core";
import { SearchRounded } from "@material-ui/icons";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import DatePicker from "@material-ui/lab/DatePicker";

import getSymbolFromCurrency from "currency-symbol-map";

import useStep from "../../../hooks/useStep";
import QuantitySelect from "../Item/QuantitySelect/QuantitySelect";
import ItemCard from "./ItemCard/ItemCard";

import useCreateItem from "./useCreateItem";

const classes = {
  loading: {
    marginTop: "1em",
    textAlign: "center",
  },
};

const CreateItem = ({ isOpen, close, addItem }) => {
  const { step, nextStep, previousStep, setInitialStep } = useStep(3);
  const {
    reset,
    searchURL,
    setSearchURL,
    search,
    loadingItems,
    itemData,
    gotResult,
    noResults,
    currencies,
    currencySelectIsOpen,
    openCurrencySelect,
    closeCurrencySelect,
    handleUnitPriceCurrencyChange,
    formValues,
    handleFormChange,
    setQuantity,
    createItem,
    handleVendorChange,
    handleDatePurchasedChange,
    getPriorityMarks,
    handlePriorityChange,
    getPriorityValue,
    handleIsPurchasedChange,
  } = useCreateItem(setInitialStep, addItem);

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
        {loadingItems && (
          <div style={classes.loading}>
            <CircularProgress></CircularProgress>
          </div>
        )}
        {gotResult && itemData && <ItemCard {...itemData} select={nextStep} />}
        {noResults && itemData && (
          <Alert severity="error">
            No results found — please enter details manually.
          </Alert>
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
            <TextField
              label="Name"
              name="name"
              value={formValues.name}
              onChange={handleFormChange}
              autoFocus
              autoComplete="off"
              spellCheck={false}
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              value={formValues.description}
              onChange={handleFormChange}
              autoComplete="off"
              spellCheck={false}
              multiline
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="URL"
              name="url"
              value={formValues.url}
              onChange={handleFormChange}
              autoComplete="off"
              spellCheck={false}
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={10}>
            <TextField
              label="Vendor"
              name="vendor"
              value={formValues.vendor?.name}
              onChange={handleVendorChange}
              autoComplete="off"
              spellCheck={false}
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Currency"
              name="unitPriceCurrency"
              value={formValues.unitPriceCurrency}
              onChange={handleUnitPriceCurrencyChange}
              onClickCapture={openCurrencySelect}
              SelectProps={{
                MenuProps: { onClose: closeCurrencySelect },
                open: currencySelectIsOpen,
              }}
              autoComplete="off"
              spellCheck={false}
              fullWidth
              select
              variant="standard"
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
              label="Unit Price"
              name="unitPrice"
              value={formValues.unitPrice}
              onChange={handleFormChange}
              autoComplete="off"
              spellCheck={false}
              fullWidth
              variant="standard"
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
            <Button onClick={nextStep}>Next</Button>
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
                createItem();
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