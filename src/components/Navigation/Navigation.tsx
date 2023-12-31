import { useLocation } from "react-router-dom";

import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import { styled } from "@mui/material/styles";

import NavLink from "./NavLink";

import styles from "./navigation.module.scss";

const DrawerHeader = styled("div")(({ theme }) => ({
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

function Navigation() {
  const location = useLocation();

  return (
    <Drawer className={styles.drawer} variant="permanent">
      <DrawerHeader />
      <Divider />
      <List>
        <NavLink
          icon={<DashboardOutlinedIcon fontSize="large" />}
          selected={location.pathname.split("/")[1] === "dashboard"}
          title="dashboard"
          to="/dashboard"
        />
      </List>
    </Drawer>
  );
}

export default Navigation;
