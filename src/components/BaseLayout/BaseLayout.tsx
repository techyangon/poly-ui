import { Navigate, Outlet } from "react-router-dom";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import { getAccessToken } from "../../api";
import { useAuth } from "../../contexts/AuthContext";
import AppBar from "../AppBar/AppBar";
import Navigation, { DrawerHeader } from "../Navigation/Navigation";

import styles from "./baselayout.module.scss";

import type { Permission } from "../../contexts/AuthContext";

function BaseLayout() {
  const { accessToken, setAccessToken, setPermissions, setUsername, username } =
    useAuth();

  if (!accessToken) {
    getAccessToken(username)
      .then((response) => setAccessToken(response.access_token))
      /* eslint-disable @typescript-eslint/no-unused-vars */
      .catch((_) => {
        return <Navigate to="/login" replace={true} />;
      });

    if (!username) {
      return <Navigate to="/login" replace={true} />;
    }
  }

  const handleLogout = () => {
    setAccessToken("");
    setPermissions({} as Permission);
    setUsername("");
  };

  return (
    <Box className={styles.rootContainer}>
      <CssBaseline />
      <AppBar onLogout={handleLogout} />
      <Navigation />
      <Box className={styles.content} component="main">
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}

export default BaseLayout;
