import {
  Home,
  Login,
  Logout,
  LogoutRounded,
  PieChart,
} from "@mui/icons-material";
import { AppBar, Toolbar, Grid, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton, LogoutButton } from "../components";

const NavBar = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  return (
    <AppBar>
      <Toolbar style={{ justifyContent: "center" }}>
        <Grid container alignItems="center" width="65em">
          <Grid item marginRight="auto">
            <Link to="/">
              <IconButton>
                <Home sx={{ color: "white", fontSize: 40 }} />
              </IconButton>
            </Link>
          </Grid>
          {!isAuthenticated && !isLoading && (
            <Grid item marginLeft="auto">
              <LoginButton />
            </Grid>
          )}
          {isAuthenticated && (
            <>
              <Grid item>
                <Link to="/budgets">
                  <IconButton>
                    <PieChart sx={{ color: "white", fontSize: 40 }} />
                  </IconButton>
                </Link>
              </Grid>
              <Grid item marginLeft="auto">
                <LogoutButton />
              </Grid>
            </>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
