import { Paper, Grid } from "@material-ui/core";

const BudgetCard = ({ id, name }) => {
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
        <Grid item xs={1}>
          {name}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BudgetCard;
