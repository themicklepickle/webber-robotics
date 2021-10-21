import {
  Button,
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import { SearchRounded } from "@mui/icons-material";
import { useContext, useState } from "react";
import { CreateItemContext } from "../contexts";
import useFetchItemDetails from "../hooks/useFetchItemDetails";

const CreateItemSearch = () => {
  const [searchURL, setSearchURL] = useState("");
  const { close, nextStep } = useContext(CreateItemContext);
  const { search, searchResults } = useFetchItemDetails();

  return <>
    <DialogContent>
      <TextField
        autoFocus
        fullWidth
        autoComplete="off"
        spellCheck={false}
        variant="standard"
        id="itemURL"
        label="Item URL"
        value={searchURL}
        onChange={(e) => setSearchURL(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && search(searchURL)}
        InputProps={{
          endAdornment: (
            <IconButton onClick={() => search(searchURL)} size="large">
              <SearchRounded />
            </IconButton>
          ),
        }}
        style={{ marginBottom: "0.5em" }}
      />
      {searchResults}
    </DialogContent>

    <DialogActions>
      <Grid container alignItems="center">
        <Grid item>
          <Button onClick={close} color="secondary">
            Cancel
          </Button>
        </Grid>
        <Grid item marginLeft="auto">
          <Button onClick={nextStep}>Enter Details Manually</Button>
        </Grid>
      </Grid>
    </DialogActions>
  </>;
};

export default CreateItemSearch;
