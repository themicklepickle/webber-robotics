import { Home, PieChart } from "@mui/icons-material";
import { AppBar, Toolbar, Grid, IconButton } from "@mui/material";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <AppBar>
      <Toolbar style={{ justifyContent: "center" }}>
        <Grid container alignItems="center" width="65em">
          <Grid item>
            <Link to="/">
              <IconButton>
                <Home sx={{ color: "white", fontSize: 40 }} />
              </IconButton>
            </Link>
          </Grid>
          <Grid item marginLeft="auto">
            <Link to="/budgets">
              <IconButton>
                <PieChart sx={{ color: "white", fontSize: 40 }} />
              </IconButton>
            </Link>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
