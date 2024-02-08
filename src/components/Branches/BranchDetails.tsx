import { useLocation, useNavigate } from "react-router-dom";

import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";

import useGetBranch from "../../hooks/useGetBranch";
import { Actions } from "../../hooks/useGetPermissions";
import useBoundStore from "../../stores";

import EditBranchForm from "./EditBranchForm";
import ViewBranchForm from "./ViewBranchForm";

import styles from "./branches.module.scss";

import type { BranchDetails } from "../../hooks/useGetBranch";

function BranchDetails() {
  const permissions = useBoundStore((state) => state.permissions);
  const navigate = useNavigate();
  const location = useLocation();

  const { data } = useGetBranch({
    id: parseInt(location.pathname.split("/").pop()!),
  });

  const handleBack = () => {
    navigate(-1);
  };

  const renderForm = (data: BranchDetails) => {
    if (permissions?.branches.includes(Actions.PUT)) {
      return <EditBranchForm branch={data} />;
    }
    return <ViewBranchForm branch={data} />;
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
        {data && renderForm(data)}
      </Grid>
    </Container>
  );
}

export default BranchDetails;
