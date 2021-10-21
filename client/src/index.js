import "./styles/index.css";

import React from "react";
import ReactDOM from "react-dom";

import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import { Auth0Provider } from "@auth0/auth0-react";

import App from "./App";
import theme from "./theme";
import dotenv from "dotenv";

dotenv.config();

const client = new ApolloClient({
  uri: process.env.REACT_APP_APOLLO_URI,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      redirectUri={window.location.origin}
    >
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <ApolloProvider client={client}>
            <App />
          </ApolloProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
