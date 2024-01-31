import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Snackbar from "@mui/material/Snackbar";

import { getAccessToken, getAllData } from "../../api";
import { useAuth } from "../../contexts/AuthContext";
import { useProfileStore } from "../../store";
import AppBar from "../AppBar/AppBar";
import Navigation, { DrawerHeader } from "../Navigation/Navigation";

import styles from "./baselayout.module.scss";

import type { Permission } from "../../contexts/AuthContext";
import type { Location, LocationResponse } from "../../types";

function BaseLayout() {
  const { accessToken, setAccessToken, setPermissions, setUsername, username } =
    useAuth();
  const [openLogoutAlert, setOpenLogoutAlert] = useState(false);

  /* Zustand store */
  const updateLocations = useProfileStore((state) => state.updateLocations);

  /* Fetch location data */
  const { data, error } = useQuery({
    queryKey: ["locations", accessToken, username],
    queryFn: async (): Promise<LocationResponse> =>
      await getAllData(accessToken, "locations", 0, 10, username),
    staleTime: Infinity,
  });
  const navigate = useNavigate();

  /* Update store */
  useEffect(() => {
    if (data) {
      const states = {} as Location;
      const cities = {} as Record<number, Location>;
      const townships = {} as Record<number, Location>;

      data.states.forEach((state) => {
        states[state.id] = state.name;
        cities[state.id] = {};

        state.cities.forEach((city) => {
          cities[state.id][city.id] = city.name;
          townships[city.id] = {};

          city.townships.forEach((tsp) => {
            townships[city.id][tsp.id] = tsp.name;
          });
        });
      });

      updateLocations({ states: states, cities: cities, townships: townships });
    }
  }, [data]);

  if (error && error.message === "Expired token") {
    setAccessToken("");
  }

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
