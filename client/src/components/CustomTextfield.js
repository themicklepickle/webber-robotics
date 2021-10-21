import { TextField } from "@mui/material";
import { useContext } from "react";
import { CreateItemContext } from "../contexts";
import { toTitleCase } from "../utils/capitalization";

const CustomTextField = (props) => {
  const { itemDetails, setItemDetail, errors } = useContext(CreateItemContext);

  const handleFormChange = async (e) => {
    const field = e.target.name;
    const value = e.target.value;

    if (!value) {
      setItemDetail(field, "");
    } else if (field === "unitPrice") {
      setItemDetail(field, parseFloat(value));
    } else {
      setItemDetail(field, value);
    }
  };

  return (
    <TextField
      autoComplete="off"
      spellCheck={false}
      fullWidth={true}
      variant="standard"
      label={toTitleCase(props.name)}
      value={itemDetails[props.name]}
      error={errors[props.name]}
      onChange={handleFormChange}
      {...props}
    />
  );
};

export default CustomTextField;
