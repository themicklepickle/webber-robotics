import { useMutation } from "@apollo/client";
import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { CREATE_BUDGET } from "../graphql/mutations";
import { BUDGETS } from "../graphql/queries";

const CreateBudget = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [createBudget] = useMutation(CREATE_BUDGET, {
    variables: { name, amount },
    refetchQueries: [BUDGETS],
  });

  return (
    <Box>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Amount"
        value={amount}
        type="number"
        onChange={(e) => setAmount(parseFloat(e.target.value))}
      />
      <Button onClick={createBudget}>Create</Button>
    </Box>
  );
};

export default CreateBudget;
