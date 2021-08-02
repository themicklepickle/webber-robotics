import { InputAdornment, InputBase } from "@material-ui/core";

import useQuantitySelect from "./useQuantitySelect";

const invalidBorderStyle = {
  borderBottom: "2px solid red",
  borderRadius: "2px",
};

const QuantitySelect = ({ quantity, setQuantity }) => {
  const { updateQuantity, isInvalid } = useQuantitySelect(setQuantity);

  const adornment = (
    <InputAdornment position="start" style={{ fontStyle: "italic" }}>
      x
    </InputAdornment>
  );

  return (
    <InputBase
      type="number"
      variant="standard"
      value={quantity}
      onChange={updateQuantity}
      startAdornment={adornment}
      style={isInvalid ? invalidBorderStyle : null}
      inputProps={{
        style: { padding: 0 },
        min: 1,
      }}
    />
  );
};

export default QuantitySelect;
