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
  const { expenditure, amount } = props;
  const percentage = (expenditure / amount) * 100;

  return (
    <div {...props} ref={ref}>
      <BorderLinearProgress
        variant="determinate"
        value={percentage > 100 ? 100 : percentage}
        color={percentage > 100 ? "error" : undefined}
      />
    </div>
  );
});

export default BudgetProgress;
