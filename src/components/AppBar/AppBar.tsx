import { MouseEvent, useState } from "react";

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Brightness4OutlinedIcon from "@mui/icons-material/Brightness4Outlined";
import Brightness7OutlinedIcon from "@mui/icons-material/Brightness7Outlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useColorScheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { useAuth } from "../../contexts/AuthContext";
import { Link } from "../Navigation/NavLink";

import styles from "./appbar.module.scss";

interface AppBarProps {
  onClick: () => void;
  onLogout: () => void;
  open: boolean;
}

function AppBar({ onClick, onLogout, open }: AppBarProps) {
  const { username } = useAuth();
  const { mode, setMode } = useColorScheme();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    /* istanbul ignore next */
    setAnchorEl(null);
  };

  const handleToggleMode = () => {
    /* istanbul ignore next */
    setMode(mode === "light" ? "dark" : "light");
  };

  return (
    <MuiAppBar>
      <Container className={styles.toolbarContainer} maxWidth={false}>
        <Toolbar>
          <Box className={styles.logoContainer}>
            <IconButton
              aria-label="open navigation"
              color="inherit"
              onClick={onClick}
              edge="start"
            >
              {open ? <CloseOutlinedIcon /> : <MenuOutlinedIcon />}
            </IconButton>
          </Box>
          <Typography className={styles.logoText} component="div" variant="h5">
            Poly
          </Typography>
          <div>
            <IconButton
              aria-label="profile"
              color="inherit"
              onClick={handleMenuOpen}
              size="large"
            >
              <AccountCircleOutlinedIcon />
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
              <MenuItem className={styles.listItem} onClick={handleToggleMode}>
                <ListItemIcon>
                  {mode === "light" ? (
                    <Brightness4OutlinedIcon />
                  ) : (
                    <Brightness7OutlinedIcon />
                  )}
                </ListItemIcon>
                <ListItemText>
                  {mode === "light" ? "Dark" : "Light"} mode
                </ListItemText>
              </MenuItem>
              <MenuItem
                className={styles.listItem}
                component={Link}
                to="/home/profile"
              >
                <ListItemIcon>
                  <SettingsOutlinedIcon />
                </ListItemIcon>
                <ListItemText>Settings</ListItemText>
              </MenuItem>
              <MenuItem onClick={onLogout}>
                <ListItemIcon>
                  <LogoutOutlinedIcon className={styles.logoutIcon} />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </Container>
    </MuiAppBar>
  );
}

export default AppBar;
