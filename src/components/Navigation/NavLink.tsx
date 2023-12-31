import { ReactElement, forwardRef } from "react";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Tooltip from "@mui/material/Tooltip";

import styles from "./navlink.module.scss";

interface NavLinkProps {
  icon: ReactElement;
  selected: boolean;
  title: string;
  to: string;
}

const Link = forwardRef<HTMLAnchorElement, RouterLinkProps>(
  function Link(itemProps, ref) {
    return <RouterLink ref={ref} {...itemProps} role={undefined} />;
  }
);

function NavLink({ icon, selected, title, to }: NavLinkProps) {
  return (
    <li>
      <ListItem
        className={styles.listItem}
        component={Link}
        disablePadding={true}
        to={to}
      >
        <Tooltip placement="right" title={title}>
          <ListItemButton className={styles.itemButton} selected={selected}>
            <ListItemIcon>{icon}</ListItemIcon>
          </ListItemButton>
        </Tooltip>
      </ListItem>
    </li>
  );
}

export default NavLink;
