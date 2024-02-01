import React, { ReactElement } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RenderOptions, render } from "@testing-library/react";

import {
  Experimental_CssVarsProvider as CssVarProvider,
  experimental_extendTheme as extendTheme,
} from "@mui/material/styles";

import { AuthContext } from "../src/contexts/AuthContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});
const theme = extendTheme();

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <CssVarProvider theme={theme}>
      <AuthContext.Provider
        value={{
          accessToken: "eyABC.DEF.GHI",
          setAccessToken: () => undefined,
          setUsername: () => undefined,
          username: "user",
        }}
      >
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </AuthContext.Provider>
    </CssVarProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render, queryClient };
