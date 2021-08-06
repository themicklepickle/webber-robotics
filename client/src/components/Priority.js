import PriorityHighRoundedIcon from "@material-ui/icons/PriorityHighRounded";
import { Icon, Tooltip } from "@material-ui/core";

import usePriority from "../hooks/usePriority";

const Priority = ({ priorityLevel }) => {
  const { label, color } = usePriority(priorityLevel);

  return (
    <Tooltip title={label} placement="bottom">
      <Icon
        style={{
          verticalAlign: "middle",
        }}
      >
        <PriorityHighRoundedIcon
          style={{ color: color }}
        ></PriorityHighRoundedIcon>
      </Icon>
    </Tooltip>
  );
};

export default Priority;
