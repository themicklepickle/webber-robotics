import { Header } from "../components";
import { useAuth0 } from "@auth0/auth0-react";

const Home = () => {
  const { user, isAuthenticated } = useAuth0();

  const title = isAuthenticated ? `Hey ${user.given_name}!` : "Webber Robotics";

  return (
    <>
      <Header title={title}></Header>
      <img src="Mr. Krabs.png" alt="Mr. Krabs" />
      <img src="Gary.png" alt="Gary" />
    </>
  );
};

export default Home;
