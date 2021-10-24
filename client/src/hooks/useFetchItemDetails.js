import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { ITEM_DETAILS } from "../graphql/queries";
import { Alert, CircularProgress } from "@mui/material";
import ItemCard from "../components/ItemCard";

const useFetchItemDetails = () => {
  const [fetchItemDetails, { called, loading, data, error }] =
    useLazyQuery(ITEM_DETAILS);
  const [searchResults, setSearchResults] = useState();

  useEffect(() => {
    if (!called) return;

    if (loading)
      setSearchResults(
        <div style={{ marginTop: "1em", textAlign: "center" }}>
          <CircularProgress />
        </div>
      );
    else if (error)
      setSearchResults(
        <Alert severity="error">
          An error occured while searching — please try again later.
        </Alert>
      );
    else if (!data?.itemDetails)
      setSearchResults(
        <Alert severity="error">
          No results found — please enter details manually.
        </Alert>
      );
    else setSearchResults(<ItemCard {...data.itemDetails} />);
  }, [loading, error, data, called]);

  const search = (url) => fetchItemDetails({ variables: { url } });

  return { search, searchResults };
};

export default useFetchItemDetails;
