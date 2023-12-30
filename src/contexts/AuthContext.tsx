import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

interface AuthContext {
  accessToken: string;
  setAccessToken: Dispatch<SetStateAction<string>>;
  setUsername: Dispatch<SetStateAction<string>>;
  username: string;
}

interface AuthProviderProps {
  children?: ReactNode;
}

const defValues: AuthContext = {
  accessToken: "",
  setAccessToken: () => undefined,
  setUsername: () => undefined,
  username: "",
};

const AuthContext = createContext<AuthContext>(defValues);

function AuthProvider({ children }: AuthProviderProps) {
  const [accessToken, setAccessToken] = useState("");
  const [username, setUsername] = useState("");
  const values = useMemo(
    () => ({ accessToken, setAccessToken, setUsername, username }),
    [accessToken, username]
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
