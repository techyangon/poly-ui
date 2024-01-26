import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

import type { Actions, Resources } from "../types";

export type Permission = Record<Resources, Actions[]>;

interface AuthContext {
  accessToken: string;
  permissions: Permission;
  setAccessToken: Dispatch<SetStateAction<string>>;
  setPermissions: Dispatch<SetStateAction<Permission>>;
  setUsername: Dispatch<SetStateAction<string>>;
  username: string;
}

interface AuthProviderProps {
  children?: ReactNode;
}

const defaultPermissions = {
  audit: [],
  branches: [],
  dashboard: [],
  locations: [],
  roles: [],
  resources: [],
  schedules: [],
  staff: [],
  students: [],
};

const defValues: AuthContext = {
  accessToken: "",
  permissions: defaultPermissions,
  setAccessToken: () => undefined,
  setPermissions: () => undefined,
  setUsername: () => undefined,
  username: "",
};

const AuthContext = createContext<AuthContext>(defValues);

function AuthProvider({ children }: AuthProviderProps) {
  const [accessToken, setAccessToken] = useState("");
  const [permissions, setPermissions] =
    useState<Permission>(defaultPermissions);
  const [username, setUsername] = useState("");
  const values = useMemo(
    () => ({
      accessToken,
      permissions,
      setAccessToken,
      setPermissions,
      setUsername,
      username,
    }),
    [accessToken, permissions, username]
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const authContext = useContext(AuthContext);

  if (authContext === undefined) {
    throw new Error("The hook must be used inside AuthProvider");
  }

  return authContext;
}

export { AuthContext, AuthProvider, useAuth };
