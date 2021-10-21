import { Paper, Grid, Tooltip } from "@mui/material";
import { BudgetProgress, EditDeleteActions, Price } from ".";

const BudgetCard = ({ id, name, amount, expenditures, remaining }) => {
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
          <EditDeleteActions />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BudgetCard;
