import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import BaseLayout from "./components/BaseLayout/BaseLayout";
import BranchDetails from "./components/Branches/BranchDetails";
import Branches from "./components/Branches/Branches";
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
      {
        path: "branches",
        element: <Branches />,
      },
      {
        path: "branches/:branchID",
        element: <BranchDetails />,
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
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default App;
