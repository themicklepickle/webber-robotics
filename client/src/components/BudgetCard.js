import { useMutation } from "@apollo/client";
import { Paper, Grid, Tooltip, Typography } from "@mui/material";
import { useContext } from "react";
import { BudgetProgress, EditDeleteActions, Price } from ".";
import { BudgetsContext } from "../contexts";
import { DELETE_BUDGET } from "../graphql/mutations";

const BudgetCard = ({ id, name, amount, editFn }) => {
  const [deleteBudget] = useMutation(DELETE_BUDGET, {
    variables: { id },
    refetchQueries: ["GetBudgets"],
  });
  const { expenditures } = useContext(BudgetsContext);
  const expenditure = expenditures[id] ?? 0;
  const remaining = amount - expenditure;

  return (
    <Paper>
      <Grid
        container
        direction="row"
        alignItems="center"
        columns={16}
        style={{
          padding: "0.5em 0",
          margin: "1em 0",
          textAlign: "center",
        }}
      >
        <Grid item xs={5}>
          {name}
        </Grid>
        <Grid item xs={6}>
          <Tooltip
            title={
              <>
                <Price amount={expenditure} currency="CAD" /> spent of{" "}
                <Price amount={amount} currency="CAD" />
              </>
            }
          >
            <BudgetProgress expenditure={expenditure} amount={amount} />
          </Tooltip>
        </Grid>
        <Grid item xs={3}>
          <Typography style={{ color: remaining < 0 ? "red" : undefined }}>
            {remaining < 0 && "–"}
            <Price amount={remaining} currency="CAD" />
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <EditDeleteActions deleteFn={deleteBudget} editFn={editFn} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BudgetCard;
