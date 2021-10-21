import { useAuth0 } from "@auth0/auth0-react";
import { Login } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <IconButton onClick={() => loginWithRedirect()}>
      <Login sx={{ color: "white", fontSize: 40 }} />
    </IconButton>
  );
};

export default LoginButton;
