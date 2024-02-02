import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { Actions } from "../../hooks/useGetPermissions";
import useBoundStore from "../../stores";

import styles from "./branches.module.scss";

function Branches() {
  const permissions = useBoundStore((state) => state.permissions);

  return (
    <Container maxWidth="md">
      <Box className={styles.heading} component="div">
        <Typography variant="h4">Branches</Typography>
        {permissions?.branches.includes(Actions.POST) && (
          <Button
            color="success"
            startIcon={<AddCircleOutlinedIcon />}
            variant="contained"
          >
            New Branch
          </Button>
        )}
      </Box>
    </Container>
  );
}

export default Branches;
