import { IconButton, Tooltip } from "@mui/material";
import { Box } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const EditDeleteActions = ({ editFn, deleteFn }) => {
  return (
    <Box>
      <IconButton onClick={editFn} size="large">
        <Tooltip title="Edit">
          <EditIcon
            onClick={(e) => {
              e.preventDefault();
              if (editFn) editFn();
            }}
          />
        </Tooltip>
      </IconButton>
      <IconButton
        onClick={(e) => {
          e.preventDefault();
          if (deleteFn) deleteFn();
        }}
        size="large"
      >
        <Tooltip title="Delete">
          <DeleteIcon />
        </Tooltip>
      </IconButton>
    </Box>
  );
};

export default EditDeleteActions;
