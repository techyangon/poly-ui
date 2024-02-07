import { useNavigate } from "react-router-dom";

import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";

import { Actions } from "../../hooks/useGetPermissions";
import useBoundStore from "../../stores";

import EditBranchForm from "./EditBranchForm";
import ViewBranchForm from "./ViewBranchForm";

import styles from "./branches.module.scss";

function BranchDetails() {
  const permissions = useBoundStore((state) => state.permissions);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Container className={styles.detailContainer} maxWidth="sm">
      <Grid container={true} spacing={2}>
        <Grid xs={12}>
          <Button
            color="primary"
            onClick={handleBack}
            startIcon={<ArrowBackOutlinedIcon />}
            variant="outlined"
          >
            Back
          </Button>
        </Grid>
        <Grid xs={12}>
          <Typography variant="h4">Branch Info</Typography>
        </Grid>
      </Grid>
      {permissions?.branches.includes(Actions.PUT) ? (
        <EditBranchForm />
      ) : (
        <ViewBranchForm />
      )}
    </Container>
  );
}

export default BranchDetails;
