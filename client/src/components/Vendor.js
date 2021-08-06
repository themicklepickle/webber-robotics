import "../styles/vendor.css";

import { Tooltip, Button } from "@material-ui/core";

const Vendor = ({ vendorName, vendorLogo, url }) => {
  return (
    <Tooltip title={vendorName} placement="bottom">
      <Button
        href={url}
        target="blank"
        style={{ padding: 0, minWidth: 0, backgroundColor: "transparent" }}
      >
        <img src={vendorLogo} alt={vendorName} className="vendor-logo"></img>
      </Button>
    </Tooltip>
  );
};

export default Vendor;
