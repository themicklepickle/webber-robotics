import { Typography } from "@mui/material";
import { styled } from "@mui/system";

const Wrapper = styled("div")({
  marginTop: "5em",
  // marginBottom: "2em",
  padding: "1em 0",
  textAlign: "center",
});

const Header = ({ title, children }) => {
  return (
    <Wrapper>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      {children}
    </Wrapper>
  );
};

export default Header;
