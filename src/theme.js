import "@fontsource/roboto";

import { createTheme } from "@material-ui/core/styles";
import { cyan, deepOrange } from "@material-ui/core/colors";

const theme = createTheme({
  typography: {
    fontFamily: "Roboto",
  },
  palette: {
    primary: cyan,
    secondary: deepOrange,
  },
});

export default theme;
