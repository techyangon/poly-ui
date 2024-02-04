import { MouseEvent, useState } from "react";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import { useAuth } from "../../contexts/AuthContext";
import useGetBranches from "../../hooks/useGetBranches";

import ViewBranchForm from "./ViewBranchForm";

import styles from "./branches.module.scss";

import type { Branch } from "../../hooks/useGetBranches";

function BranchesTable() {
  const { setAccessToken } = useAuth();

  const [page, setPage] = useState(0);
  const [id, setID] = useState(0);
  const { isLoading, data, error } = useGetBranches({ id: id, per_page: 10 });

  const [curBranch, setCurBranch] = useState<Branch>({} as Branch);
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleChangePage = (
    _: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    if (newPage < page) {
      setID((id) => id - 10);
    } else {
      setID((id) => id + 10);
    }
    setPage(newPage);
  };

  /* istanbul ignore if */
  if (error?.message === "Expired token") {
    setAccessToken("");
  }

  const handleViewRow = (branch?: Branch) => {
    setOpenDrawer((prev) => !prev);
    if (branch) {
      setCurBranch(branch);
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="Branches">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Township</TableCell>
              <TableCell>City</TableCell>
              <TableCell>State</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading && (
              <TableRow>
                {Array.from({ length: 5 }).map((_, i) => (
                  <TableCell key={i}>
                    <Skeleton />
                  </TableCell>
                ))}
              </TableRow>
            )}
            {data?.branches?.map((branch) => (
              <TableRow key={branch.id}>
                <TableCell className={styles.stickyColumn}>
                  {branch.name}
                </TableCell>
                <TableCell>{branch.address}</TableCell>
                <TableCell>{branch.township}</TableCell>
                <TableCell>{branch.city}</TableCell>
                <TableCell>{branch.state}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label={`view ${branch.name} data`}
                    color="primary"
                    onClick={() => handleViewRow(branch)}
                  >
                    <KeyboardArrowRightOutlinedIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {error && error.message.includes("branches") && (
          <p className={styles.noBranches}>{error.message}</p>
        )}
      </TableContainer>
      <TablePagination
        component="div"
        count={data?.total ?? 0}
        onPageChange={handleChangePage}
        page={page}
        rowsPerPage={10}
        rowsPerPageOptions={[10]}
      />
      <Drawer
        anchor={"right"}
        data-testid="row-data"
        open={openDrawer}
        onClose={() => handleViewRow()}
      >
        <Box className={styles.drawer}>
          <Box className={styles.closeDrawer} component="div">
            <IconButton
              aria-label="close drawer"
              onClick={() => handleViewRow()}
            >
              <CloseOutlinedIcon />
            </IconButton>
          </Box>
          <ViewBranchForm branch={curBranch} />
        </Box>
      </Drawer>
    </>
  );
}

export default BranchesTable;
