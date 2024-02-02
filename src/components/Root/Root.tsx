import { Navigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";

function Root() {
  const { accessToken } = useAuth();

  if (accessToken) {
    return <Navigate to="/home/profile" replace={true} />;
  } else {
    return <Navigate to="/login" replace={true} />;
  }
}

export default Root;
