import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Snackbar from "@mui/material/Snackbar";

import { useAuth } from "../../contexts/AuthContext";
import useGetAccessToken from "../../hooks/useGetAccessToken";
import useGetLocations, {
  transformLocationData,
} from "../../hooks/useGetLocations";
import useGetPermissions, {
  transformPermissionData,
} from "../../hooks/useGetPermissions";
import useBoundStore from "../../stores";
import AppBar from "../AppBar/AppBar";
import Navigation, { DrawerHeader } from "../Navigation/Navigation";

import styles from "./baselayout.module.scss";

function BaseLayout() {
  const { accessToken, setAccessToken, setUsername } = useAuth();
  const {
    data: accessTokenData,
    error: accessTokenError,
    refetch,
  } = useGetAccessToken();

  const [openLogoutAlert, setOpenLogoutAlert] = useState(false);
  const navigate = useNavigate();

  const { data: permissionsData, error: permissionsDataError } =
    useGetPermissions();
  const updatePermissions = useBoundStore((state) => state.updatePermissions);
  const updateRole = useBoundStore((state) => state.updateRole);

  const { data: locationData, error: locationDataError } = useGetLocations();
  const updateCities = useBoundStore((state) => state.updateCities);
  const updateStates = useBoundStore((state) => state.updateStates);
  const updateTownships = useBoundStore((state) => state.updateTownships);

  useEffect(() => {
    if (accessToken === "") {
      /* istanbul ignore next */
      void (async () => await refetch())();
    }
  }, [accessToken]);

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
      setTimeout(() => {
        /* istanbul ignore next */
        navigate("/");
        /* istanbul ignore next */
        navigate(0);
      }, 3000);
    }
  }, [accessTokenError]);

  useEffect(() => {
    if (permissionsData) {
      updateRole(permissionsData.role);
      updatePermissions(transformPermissionData(permissionsData));
    }
  }, [permissionsData]);

  useEffect(() => {
    if (locationData) {
      const locations = transformLocationData(locationData);
      updateCities(locations.cities);
      updateStates(locations.states);
      updateTownships(locations.townships);
    }
  }, [locationData]);

  useEffect(() => {
    if (
      locationDataError?.message === "Expired token" ||
      permissionsDataError?.message === "Expired token"
    ) {
      setAccessToken("");
    }
  }, [locationDataError, permissionsDataError]);

  const handleLogout = () => {
    setAccessToken("");
    setUsername("");
    navigate("/login", { replace: true });
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
          <Alert
            className={styles.alert}
            onClose={handleCloseAlert}
            severity="warning"
            variant="filled"
          >
            Your session has expired. Redirecting you to login.
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}

export default BaseLayout;
