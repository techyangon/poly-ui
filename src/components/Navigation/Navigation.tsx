import { useLocation } from "react-router-dom";

import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import { styled } from "@mui/material/styles";

import useBoundStore from "../../stores";

import NavLink from "./NavLink";

import styles from "./navigation.module.scss";

export const DrawerHeader = styled("div")(({ theme }) => ({
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

function Navigation() {
  const location = useLocation();

  const permissions = useBoundStore((state) => state.permissions);

  return (
    <Drawer className={styles.drawer} variant="permanent">
      <DrawerHeader />
      <Divider />
      <List>
        {permissions.dashboard?.length && (
          <NavLink
            icon={<DashboardOutlinedIcon fontSize="medium" />}
            selected={location.pathname.split("/")[2] === "dashboard"}
            title="Dashboard"
            to="dashboard"
          />
        )}
        {permissions.branches?.length && (
          <NavLink
            icon={<BusinessOutlinedIcon fontSize="medium" />}
            selected={location.pathname.split("/")[2] === "branches"}
            title="Branches"
            to="branches"
          />
        )}
      </List>
    </Drawer>
  );
}

export default Navigation;
