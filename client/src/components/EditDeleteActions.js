import { IconButton } from "@mui/material";
import { Box } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const EditDeleteActions = ({ editFn, deleteFn }) => {
  return (
    <Box>
      <IconButton onClick={editFn} size="large">
        <EditIcon></EditIcon>
      </IconButton>
      <IconButton onClick={deleteFn} size="large">
        <DeleteIcon></DeleteIcon>
      </IconButton>
    </Box>
  );
};

export default EditDeleteActions;
