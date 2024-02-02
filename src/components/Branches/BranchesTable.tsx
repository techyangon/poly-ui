import { MouseEvent, useState } from "react";

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

import styles from "./branches.module.scss";

function BranchesTable() {
  const { setAccessToken } = useAuth();

  const [page, setPage] = useState(0);
  const [id, setID] = useState(0);
  const { isLoading, data, error } = useGetBranches({ id: id, per_page: 10 });

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
                <TableCell>{branch.name}</TableCell>
                <TableCell>{branch.address}</TableCell>
                <TableCell>{branch.township}</TableCell>
                <TableCell>{branch.city}</TableCell>
                <TableCell>{branch.state}</TableCell>
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
    </>
  );
}

export default BranchesTable;
