import { useMutation } from "@apollo/client";
import { Paper, Grid, Tooltip } from "@mui/material";
import { BudgetProgress, EditDeleteActions, Price } from ".";
import { DELETE_BUDGET } from "../graphql/mutations";

const BudgetCard = ({ id, name, amount, expenditures, remaining }) => {
  const [deleteBudget] = useMutation(DELETE_BUDGET, {
    variables: { id },
    refetchQueries: ["GetBudgets"],
  });

  return (
    <Paper>
      <Grid
        container
        direction="row"
        alignItems="center"
        style={{
          padding: "0.5em 0",
          margin: "1em 0",
          textAlign: "center",
        }}
      >
        <Grid item xs={4}>
          {name}
        </Grid>
        <Grid item xs={3}>
          <Tooltip
            title={
              <>
                <Price amount={expenditures} currency="CAD" /> spent of{" "}
                <Price amount={amount} currency="CAD" />
              </>
            }
          >
            <BudgetProgress expenditures={expenditures} amount={amount} />
          </Tooltip>
        </Grid>
        <Grid item xs={3}>
          <Price amount={remaining} currency="CAD" />
        </Grid>
        <Grid item xs={2}>
          <EditDeleteActions deleteFn={deleteBudget} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BudgetCard;
