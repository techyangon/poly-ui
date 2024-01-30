import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Snackbar from "@mui/material/Snackbar";

import { getAccessToken } from "../../api";
import { useAuth } from "../../contexts/AuthContext";
import AppBar from "../AppBar/AppBar";
import Navigation, { DrawerHeader } from "../Navigation/Navigation";

import styles from "./baselayout.module.scss";

import type { Permission } from "../../contexts/AuthContext";

function BaseLayout() {
  const { accessToken, setAccessToken, setPermissions, setUsername, username } =
    useAuth();
  const [openLogoutAlert, setOpenLogoutAlert] = useState(false);
  const navigate = useNavigate();

  if (!accessToken) {
    getAccessToken(username)
      .then((response) => setAccessToken(response.access_token))
      /* eslint-disable @typescript-eslint/no-unused-vars */
      .catch((_) => {
        setOpenLogoutAlert(true);
        setTimeout(() => navigate("/login", { replace: true }), 3000);
      });

    if (!username) {
      navigate("/login", { replace: true });
    }
  }

  const handleLogout = () => {
    setAccessToken("");
    setPermissions({} as Permission);
    setUsername("");
  };

  const handleCloseAlert = () => {
    setOpenLogoutAlert(false);
  };

  return (
    <Box className={styles.rootContainer}>
      <CssBaseline />
      <AppBar onLogout={handleLogout} />
      <Navigation />
      <Box className={styles.content} component="main">
        <DrawerHeader />
        <Outlet />
        <Snackbar
          autoHideDuration={3000}
          onClose={handleCloseAlert}
          open={openLogoutAlert}
        >
          <Alert className={styles.alert} severity="warning" variant="filled">
            Your session has expired. Redirecting you to login.
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}

export default BaseLayout;
