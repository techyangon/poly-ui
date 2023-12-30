import { MouseEvent, ReactNode, useState } from "react";
import { Navigate } from "react-router-dom";

import AccountCircle from "@mui/icons-material/AccountCircle";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Appbar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import Logo from "../../../poly-white.svg";
import { useAuth } from "../../contexts/AuthContext";

import styles from "./baselayout.module.scss";

interface BaseLayoutProps {
  children?: ReactNode;
}

function BaseLayout({ children }: BaseLayoutProps) {
  const { accessToken, setAccessToken, setUsername, username } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  if (!accessToken) {
    return <Navigate to="/login" replace={true} />;
  }

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAccessToken("");
    setUsername("");
  };

  return (
    <Box className={styles.rootContainer}>
      <CssBaseline />
      <Appbar>
        <Container disableGutters={true} maxWidth={false}>
          <Toolbar>
            <img className={styles.logo} src={Logo} />
            <Typography
              className={styles.logoText}
              component="div"
              variant="h5"
            >
              Poly
            </Typography>
            <div>
              <IconButton
                aria-label="profile"
                color="inherit"
                onClick={handleMenuOpen}
                size="large"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                className={styles.menuAppbar}
                id="menu-appbar"
                keepMounted={true}
                onClose={handleMenuClose}
                open={Boolean(anchorEl)}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem>{username}</MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemIcon>
                    <SettingsOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText>Settings</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutOutlinedIcon className={styles.logoutIcon} />
                  </ListItemIcon>
                  <ListItemText>Logout</ListItemText>
                </MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </Container>
      </Appbar>
      <Box component="main">{children}</Box>
    </Box>
  );
}

export default BaseLayout;
