import { RouterProvider, createBrowserRouter } from "react-router-dom";

import {
  Experimental_CssVarsProvider as CssVarProvider,
  StyledEngineProvider,
} from "@mui/material/styles";

import Login from "./components/Login/Login";
import Root from "./components/Root/Root";
import { AuthProvider } from "./contexts/AuthContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

const App = () => {
  return (
    <StyledEngineProvider injectFirst={true}>
      <CssVarProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </CssVarProvider>
    </StyledEngineProvider>
  );
};

export default App;
