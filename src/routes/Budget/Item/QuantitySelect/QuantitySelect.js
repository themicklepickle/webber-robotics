import { InputAdornment, InputBase } from "@material-ui/core";

import useQuantitySelect from "./useQuantitySelect";

const QuantitySelect = ({ quantity, setQuantity }) => {
  // TODO: check whether or not the input is valid. If not, change the font color of everything to red
  const { updateQuantity, borderStyle } = useQuantitySelect(setQuantity);

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
      style={borderStyle}
      inputProps={{
        style: { padding: 0 },
        min: 1,
      }}
    >
      hello
    </InputBase>
  );
};

export default QuantitySelect;
