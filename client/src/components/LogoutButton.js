import { useAuth0 } from "@auth0/auth0-react";
import { Logout } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <IconButton onClick={() => logout({ returnTo: window.location.origin })}>
      <Logout sx={{ color: "white", fontSize: 40 }} />
    </IconButton>
  );
};

export default LogoutButton;
