import {
  Experimental_CssVarsProvider as CssVarProvider,
  StyledEngineProvider,
} from "@mui/material/styles";

const App = () => {
  return (
    <StyledEngineProvider injectFirst={true}>
      <CssVarProvider></CssVarProvider>
    </StyledEngineProvider>
  );
};

export default App;
