import { useContext, useRef } from "react";

import {
  Card,
  CardMedia,
  Grid,
  Typography,
  IconButton,
  Grow,
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { ChevronRightRounded } from "@material-ui/icons";
import { CreateItemContext } from "../contexts";

const ItemCard = (props) => {
  const { name, image } = props;
  const { __typename, ...vendor } = props.vendor;
  const selectButton = useRef(null);
  const { nextStep, itemDetails, setItemDetails } =
    useContext(CreateItemContext);

  const focusOnSelectButton = () => {
    selectButton.current.focus();
  };

  return (
    <Grow in={true} timeout={600} onEntered={focusOnSelectButton}>
      <Card>
        <Grid container direction="row">
          <Grid item xs={4} alignSelf="center">
            <CardMedia component="img" image={image} />
          </Grid>
          <Grid item xs={8}>
            <Grid
              container
              direction="row"
              style={{ height: "100%", padding: "1em" }}
              alignItems="stretch"
            >
              <Grid item xs={10} container direction="column">
                <Grid item xs={10}>
                  <Typography gutterBottom variant="h6">
                    {name}
                  </Typography>
                  <Grid container alignItems="center">
                    <Grid item xs={2} style={{ paddingRight: "1em" }}>
                      <img
                        height="30px"
                        style={{ verticalAlign: "middle" }}
                        alt={vendor?.name}
                        src={vendor?.logo}
                      />
                    </Grid>
                    <Grid item xs={10} style={{ margin: 0, color: "#6b6b6b" }}>
                      {vendor?.name}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={2} alignSelf="center">
                <IconButton
                  onClick={() => {
                    setItemDetails({ ...itemDetails, ...props, vendor });
                    nextStep();
                  }}
                  ref={selectButton}
                >
                  <ChevronRightRounded
                    fontSize="large"
                    style={{ color: green[500] }}
                  />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Grow>
  );
};

export default ItemCard;
