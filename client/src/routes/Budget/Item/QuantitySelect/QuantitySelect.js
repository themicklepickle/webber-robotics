import { InputAdornment, InputBase } from "@material-ui/core";

import useQuantitySelect from "./useQuantitySelect";

const invalidBorderStyle = {
  borderBottom: "2px solid red",
  borderRadius: "2px",
};

const QuantitySelect = ({ itemId, initialQuantity, onChange }) => {
  const { quantity, updateQuantity, isInvalid } = useQuantitySelect(
    itemId,
    initialQuantity,
    onChange
  );

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
