import { Tooltip } from "@material-ui/core";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import { green } from "@material-ui/core/colors";

const useIsPurchasedCheckBox = ({
  isChecked,
  datePurchased,
  check,
  uncheck,
}) => {
  const getIcon = () => {
    if (isChecked) {
      return <CheckBoxIcon style={{ color: green[500] }}></CheckBoxIcon>;
    }
    return <CheckBoxOutlineBlankIcon></CheckBoxOutlineBlankIcon>;
  };

  const addTooltip = (icon) => {
    if (!isChecked || !datePurchased) return icon;

    return (
      <Tooltip
        title={`Purchased on ${datePurchased.toDateString()}`}
        placement="bottom"
      >
        {icon}
      </Tooltip>
    );
  };

  const toggleCheck = () => {
    if (isChecked) {
      uncheck();
    } else {
      check();
    }
  };

  const icon = getIcon();
  return {
    icon: addTooltip(icon),
    toggleCheck: toggleCheck,
  };
};

export default useIsPurchasedCheckBox;
