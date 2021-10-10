import { useMutation } from "@apollo/client";
import { Button, TextField } from "@material-ui/core";
import { Box } from "@material-ui/system";
import { useState } from "react";
import { CREATE_BUDGET } from "../graphql/mutations";
import { BUDGETS } from "../graphql/queries";

const CreateBudget = () => {
  const [name, setName] = useState("");
  const [createBudget] = useMutation(CREATE_BUDGET, {
    variables: { name },
    refetchQueries: [BUDGETS],
  });

  return (
    <Box>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button onClick={createBudget}>Create</Button>
    </Box>
  );
};

export default CreateBudget;
