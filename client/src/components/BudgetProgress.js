import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import React from "react";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
  },
}));

const BudgetProgress = React.forwardRef((props, ref) => {
  const { expenditures, amount } = props;
  const percentage = (expenditures / amount) * 100;

  return (
    <div {...props} ref={ref}>
      <BorderLinearProgress variant="determinate" value={percentage} />
    </div>
  );
});

export default BudgetProgress;
