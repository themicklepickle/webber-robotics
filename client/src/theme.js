import "@fontsource/roboto";

import { createTheme, adaptV4Theme } from "@mui/material/styles";
import { cyan, deepOrange } from "@mui/material/colors";

const theme = createTheme(adaptV4Theme({
  typography: {
    fontFamily: "Roboto",
  },
  palette: {
    primary: cyan,
    secondary: deepOrange,
  },
}));

export default theme;
