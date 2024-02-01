import React from "react";

import ReactDOM from "react-dom/client";

import {
  Experimental_CssVarsProvider as CssVarProvider,
  StyledEngineProvider,
  experimental_extendTheme as extendTheme,
} from "@mui/material/styles";

import App from "./App";

function Root() {
  /* istanbul ignore next */
  const theme = extendTheme();

  return (
    <StyledEngineProvider injectFirst={true}>
      <CssVarProvider theme={theme}>
        <App />
      </CssVarProvider>
    </StyledEngineProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
