import { cyan } from "@material-ui/core/colors";

const usePriority = ({ priority }) => {
  const displayOptions = {
    High: {
      color: cyan[800],
    },
    Medium: {
      color: cyan[500],
    },
    Low: {
      color: cyan[200],
    },
  };

  return {
    label: `${priority} priority`,
    color: displayOptions[priority].color,
  };
};

export default usePriority;
