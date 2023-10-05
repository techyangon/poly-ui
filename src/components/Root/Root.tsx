import { Navigate } from "react-router-dom";

import { useAuth } from "@/contexts/AuthContext";

function Root() {
  const authContext = useAuth();

  if (authContext.email && authContext.accessToken) {
    return <Navigate to="/dashboard" replace={true} />;
  } else {
    return <Navigate to="/login" replace={true} />;
  }
}

export default Root;
