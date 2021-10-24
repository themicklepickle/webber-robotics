import { useMutation } from "@apollo/client";
import {
  Dialog,
  DialogTitle,
  Button,
  DialogContent,
  TextField,
  Grid,
  DialogActions,
  InputAdornment,
} from "@mui/material";
import { Box } from "@mui/system";
import getSymbolFromCurrency from "currency-symbol-map";
import { useState } from "react";
import { CREATE_BUDGET } from "../graphql/mutations";
import { toTitleCase } from "../utils/capitalization";

const CustomTextfield = ({ name, ...restProps }) => {
  return (
    <TextField
      autoComplete="off"
      spellCheck={false}
      variant="standard"
      fullWidth={true}
      label={toTitleCase(name)}
      {...restProps}
    />
  );
};

const CreateBudget = ({ isOpen, closeModal }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [createBudget] = useMutation(CREATE_BUDGET, {
    variables: { name, amount },
    refetchQueries: ["GetBudgets"],
  });
  const [errors, setErrors] = useState({});

  const close = () => {
    closeModal();
    setName("");
    setAmount("");
    setErrors({});
  };

  const validate = () => {
    const newErrors = {
      name: name === "",
      amount: amount <= 0,
    };
    setErrors(newErrors);

    return Object.values(newErrors).every((value) => value === false);
  };

  return (
    <Dialog open={isOpen} onClose={close} fullWidth>
      <DialogTitle style={{ textAlign: "center" }}>
        <Box fontWeight={500}>Create Budget</Box>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={9}>
            <CustomTextfield
              name="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors?.name}
            />
          </Grid>
          <Grid item xs={3}>
            <CustomTextfield
              name="Amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
              error={errors?.amount}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {getSymbolFromCurrency("CAD")}
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
            <Button onClick={() => close()} color="secondary">
              Cancel
            </Button>
          </Grid>
          <Grid item marginLeft="auto">
            <Button onClick={() => validate() && createBudget()}>Create</Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default CreateBudget;
