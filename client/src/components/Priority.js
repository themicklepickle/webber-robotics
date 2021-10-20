import PriorityHighRoundedIcon from "@mui/icons-material/PriorityHighRounded";
import { Icon, Tooltip } from "@mui/material";

import { usePriority } from "../hooks";

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
