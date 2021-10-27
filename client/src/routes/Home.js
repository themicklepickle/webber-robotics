import { Header } from "../components";
import { useAuth0 } from "@auth0/auth0-react";
import animationData from "../animations/hello.json";
import Lottie from "react-lottie";
import { Avatar, Grid, Typography } from "@mui/material";
import { useState } from "react";

const animationOptions = {
  loop: false,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const Home = () => {
  const { user, isAuthenticated } = useAuth0();
  const [animationComplete, setAnimationComplete] = useState(false);

  const title = isAuthenticated ? `Hey ${user.given_name}!` : "Webber Robotics";

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ height: "100vh" }}
    >
      <Grid item>
        <Lottie
          options={animationOptions}
          width={500}
          height={300}
          eventListeners={[
            {
              eventName: "complete",
              callback: () => setAnimationComplete(true),
            },
          ]}
        />
      </Grid>
      {isAuthenticated && (
        <Grid
          item
          container
          alignItems="center"
          justifyContent="center"
          spacing="2em"
          sx={{
            visibility: animationComplete ? "visible" : "hidden",
            animation: animationComplete
              ? "fadeInAnimation ease 2s"
              : undefined,
          }}
        >
          <Grid item>
            <Avatar
              src={user?.picture}
              sx={{
                width: 56,
                height: 56,
                float: "left",
              }}
            />
          </Grid>
          <Grid item>
            <Typography variant="h3" sx={{ float: "right" }}>
              {user?.name}
            </Typography>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default Home;
