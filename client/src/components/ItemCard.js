import {
  Card,
  CardMedia,
  Grid,
  Typography,
  IconButton,
  Badge,
  Grow,
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { ChevronRightRounded } from "@material-ui/icons";

import { Price } from "../components";
import { useItemCard } from "../hooks";

const ItemCard = ({
  name,
  unitPrice,
  unitPriceCurrency,
  vendor,
  url,
  image,
  select,
}) => {
  const { selectButton, focusOnSelectButton } = useItemCard();

  return (
    <Grow in={true} timeout={600} onEntered={focusOnSelectButton}>
      <Card>
        <Grid container direction="row">
          <Grid item xs={4} alignSelf="center">
            <Badge
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              badgeContent={
                <img
                  height="30"
                  style={{ padding: "0 0 3em 3em" }}
                  alt={vendor.name}
                  src={vendor.logo}
                />
              }
            >
              <CardMedia component="img" image={image} />
            </Badge>
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
                </Grid>
                <Grid item>
                  <Price amount={unitPrice} currency={unitPriceCurrency} />
                </Grid>
              </Grid>
              <Grid item xs={2} alignSelf="center">
                <IconButton onClick={select} ref={selectButton}>
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
