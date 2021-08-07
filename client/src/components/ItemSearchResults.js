import { Alert, CircularProgress } from "@material-ui/core";

import { useQuery } from "@apollo/client";
import { ITEM_DETAILS } from "../graphql/queries";
import ItemCard from "./ItemCard";

const ItemSearchResults = ({ url, select }) => {
  const { data, loading, error } = useQuery(ITEM_DETAILS, {
    variables: { url },
  });

  if (loading)
    return (
      <div
        style={{
          marginTop: "1em",
          textAlign: "center",
        }}
      >
        <CircularProgress />
      </div>
    );

  if (error)
    return (
      <Alert severity="error">
        An error occured while searching — please try again later.
      </Alert>
    );

  if (Object.keys(data).length === 0 || !data.itemDetails)
    return (
      <Alert severity="error">
        No results found — please enter details manually.
      </Alert>
    );

  console.log(data.itemDetails);

  return (
    <ItemCard {...data.itemDetails} select={() => select(data.itemDetails)} />
  );
};

export default ItemSearchResults;
