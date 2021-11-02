import { Tooltip, Button } from "@mui/material";
import { styled } from "@mui/system";

const VendorLogo = styled("img")({
  maxHeight: "3em",
  maxWidth: "4em",
  "&:hover": {
    filter: "opacity(60%)",
  },
});

const VendorButton = styled(Button)({
  padding: 0,
  minWidth: 0,
  backgroundColor: "transparent",
});

const Vendor = ({ vendorName, vendorLogo, url }) => {
  return (
    <Tooltip title={vendorName} placement="bottom">
      <VendorButton href={url} target="blank">
        <VendorLogo src={vendorLogo} alt={vendorName} />
      </VendorButton>
    </Tooltip>
  );
};

export default Vendor;
