import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import {
  Experimental_CssVarsProvider as CssVarProvider,
  StyledEngineProvider,
} from "@mui/material/styles";

import BaseLayout from "./components/BaseLayout/BaseLayout";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import Root from "./components/Root/Root";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/home",
    element: <BaseLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
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
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </AuthProvider>
      </CssVarProvider>
    </StyledEngineProvider>
  );
};

export default App;
