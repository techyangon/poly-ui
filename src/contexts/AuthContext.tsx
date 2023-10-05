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
  email: string;
  setAccessToken: Dispatch<SetStateAction<string>>;
  setEmail: Dispatch<SetStateAction<string>>;
}

interface AuthProviderProps {
  children?: ReactNode;
}

const defValues: AuthContext = {
  accessToken: "",
  email: "",
  setAccessToken: () => undefined,
  setEmail: () => undefined,
};

const AuthContext = createContext<AuthContext>(defValues);

function AuthProvider({ children }: AuthProviderProps) {
  const [email, setEmail] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const values = useMemo(
    () => ({ accessToken, email, setAccessToken, setEmail }),
    [accessToken, email]
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
