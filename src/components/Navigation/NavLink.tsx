import { ReactElement, forwardRef } from "react";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

interface NavLinkProps {
  icon: ReactElement;
  selected: boolean;
  title: string;
  to: string;
}

export const Link = forwardRef<HTMLAnchorElement, RouterLinkProps>(
  function Link(itemProps, ref) {
    return <RouterLink ref={ref} {...itemProps} role={undefined} />;
  }
);

function NavLink({ icon, selected, title, to }: NavLinkProps) {
  return (
    <ListItem component={Link} to={to}>
      <ListItemButton selected={selected}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText>{title}</ListItemText>
      </ListItemButton>
    </ListItem>
  );
}

export default NavLink;
