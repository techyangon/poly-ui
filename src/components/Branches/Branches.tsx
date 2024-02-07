import { MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TablePagination from "@mui/material/TablePagination";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";

import useGetBranches from "../../hooks/useGetBranches";
import { Actions } from "../../hooks/useGetPermissions";
import useBoundStore from "../../stores";

import BranchesTable from "./BranchesTable";

import styles from "./branches.module.scss";

function Branches() {
  const permissions = useBoundStore((state) => state.permissions);

  const [lastPaginatedID, setLastPaginatedID] = useState(0);
  const [page, setPage] = useState(0);

  const { data } = useGetBranches({ id: lastPaginatedID, per_page: 10 });

  const navigate = useNavigate();

  const handleViewRow = (branchID: number) => {
    navigate(`${branchID}`, { replace: false });
  };

  const handleChangePage = (
    _: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    if (newPage < page) {
      setLastPaginatedID((id) => id - 10);
    } else {
      setLastPaginatedID((id) => id + 10);
    }
    setPage(newPage);
  };

  return (
    <Container maxWidth="md">
      <Grid container={true} spacing={2}>
        <Grid xs={12} sm={6}>
          <Typography variant="h4">Branches</Typography>
        </Grid>
        <Grid className={styles.newButton} xs={12} sm={6}>
          {permissions?.branches.includes(Actions.POST) && (
            <Button
              color="success"
              startIcon={<AddCircleOutlinedIcon />}
              variant="contained"
            >
              New Branch
            </Button>
          )}
        </Grid>
        <Grid xs={12}>
          {data?.branches && (
            <>
              <BranchesTable branches={data.branches} onClick={handleViewRow} />
              <TablePagination
                component="div"
                count={data?.total ?? 0}
                onPageChange={handleChangePage}
                page={page}
                rowsPerPage={10}
                rowsPerPageOptions={[10]}
              />
            </>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default Branches;
