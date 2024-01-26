import React, { ReactElement } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RenderOptions, render } from "@testing-library/react";

import { AuthContext } from "../src/contexts/AuthContext";

import type { Permission } from "../src/contexts/AuthContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const permissions = {
  audit: [],
  branches: [],
  dashboard: ["GET"],
  locations: [],
  roles: [],
  resources: [],
  schedules: [],
  staff: [],
  students: [],
} as Permission;

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthContext.Provider
      value={{
        accessToken: "eyABC.DEF.GHI",
        permissions: permissions,
        setAccessToken: () => undefined,
        setPermissions: () => undefined,
        setUsername: () => undefined,
        username: "user",
      }}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </AuthContext.Provider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render, queryClient };
