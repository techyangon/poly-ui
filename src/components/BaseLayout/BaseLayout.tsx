import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Snackbar from "@mui/material/Snackbar";

import { useAuth } from "../../contexts/AuthContext";
import useGetAccessToken from "../../hooks/useGetAccessToken";
import useGetLocations from "../../hooks/useGetLocations";
import { useProfileStore } from "../../store";
import AppBar from "../AppBar/AppBar";
import Navigation, { DrawerHeader } from "../Navigation/Navigation";

import styles from "./baselayout.module.scss";

import type { Permission } from "../../contexts/AuthContext";

function BaseLayout() {
  const { setAccessToken, setPermissions, setUsername, username } = useAuth();
  const { data: accessTokenData, error: accessTokenError } =
    useGetAccessToken();

  const [openLogoutAlert, setOpenLogoutAlert] = useState(false);
  const navigate = useNavigate();

  if (accessTokenData) {
    setAccessToken(accessTokenData.access_token);
    setUsername(accessTokenData.name);
  }
  if (accessTokenError && accessTokenError.message === "Expired token") {
    setOpenLogoutAlert(true);
    setTimeout(() => navigate("/login", { replace: true }), 3000);
  }
  if (!username) {
    navigate("/login", { replace: true });
  }

  const { data: locationData, error: locationError } = useGetLocations();
  const updateLocations = useProfileStore((state) => state.updateLocations);

  if (locationError && locationError.message === "Expired token") {
    setAccessToken("");
  }

  /* Update store */
  useEffect(() => {
    if (locationData) {
      updateLocations(locationData);
    }
  }, [locationData]);

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
