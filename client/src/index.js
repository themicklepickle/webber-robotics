import "./styles/index.css";

import React from "react";
import ReactDOM from "react-dom";

import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import App from "./App";
import theme from "./theme";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
