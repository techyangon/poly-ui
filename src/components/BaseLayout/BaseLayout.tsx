import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Snackbar from "@mui/material/Snackbar";

import { useAuth } from "../../contexts/AuthContext";
import useGetAccessToken from "../../hooks/useGetAccessToken";
import useGetPermissions, {
  transformPermissionData,
} from "../../hooks/useGetPermissions";
import useBoundStore from "../../stores";
import AppBar from "../AppBar/AppBar";
import Navigation, { DrawerHeader } from "../Navigation/Navigation";

import styles from "./baselayout.module.scss";

function BaseLayout() {
  const { setAccessToken, setUsername, username } = useAuth();
  const { data: accessTokenData, error: accessTokenError } =
    useGetAccessToken();

  const [openLogoutAlert, setOpenLogoutAlert] = useState(false);
  const navigate = useNavigate();

  const { data: permissionsData, error: permissionsDataError } =
    useGetPermissions();
  const updatePermissions = useBoundStore((state) => state.updatePermissions);
  const updateRole = useBoundStore((state) => state.updateRole);

  useEffect(() => {
    if (accessTokenData) {
      setAccessToken(accessTokenData.access_token);
      setUsername(accessTokenData.name);
    }
  }, [accessTokenData]);

  /* Refresh token expiry */
  useEffect(() => {
    if (accessTokenError?.message === "Expired token") {
      setOpenLogoutAlert(true);
      setTimeout(() => navigate("/login", { replace: true }), 3000);
    }
  }, [accessTokenError]);

  useEffect(() => {
    if (permissionsData) {
      updateRole(permissionsData.role);
      updatePermissions(transformPermissionData(permissionsData));
    }
  }, [permissionsData]);

  useEffect(() => {
    if (permissionsDataError?.message === "Expired token") {
      setAccessToken("");
    }
  }, [permissionsDataError]);

  if (!username) {
    navigate("/login", { replace: true });
  }

  const handleLogout = () => {
    setAccessToken("");
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
