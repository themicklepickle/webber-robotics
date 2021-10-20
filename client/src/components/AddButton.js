import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/system";

const Wrapper = styled("div")({
  position: "sticky",
  textAlign: "center",
  bottom: "3em",
  marginTop: "2em",
  marginBottom: "3em",
});

const AddButton = ({ onClick }) => {
  return (
    <Wrapper>
      <Fab color="primary" onClick={onClick}>
        <AddIcon />
      </Fab>
    </Wrapper>
  );
};

export default AddButton;
