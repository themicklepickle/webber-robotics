import { cyan } from "@material-ui/core/colors";

const usePriority = (priorityLevel) => {
  const priorityColors = {
    High: cyan[800],
    Medium: cyan[500],
    Low: cyan[200],
  };

  return {
    label: `${priorityLevel} priority`,
    color: priorityColors[priorityLevel],
  };
};

export default usePriority;
