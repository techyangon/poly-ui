import { useMediaQuery } from "react-responsive";

import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import styles from "./branches.module.scss";

import type { Branch } from "../../hooks/useGetBranches";

interface BranchesTableProps {
  branches: Branch[];
  onClick: (id: number) => void;
}

function BranchesTable({ branches, onClick }: BranchesTableProps) {
  const sm = useMediaQuery({ query: "(max-width: 600px)" });
  const md = useMediaQuery({ query: "(max-width: 900px)" });

  return (
    <TableContainer component={Paper}>
      <Table aria-label="Branches">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell className={sm || md ? styles.noTbCell : styles.tbCell}>
              Address
            </TableCell>
            <TableCell>Township</TableCell>
            <TableCell className={sm || md ? styles.noTbCell : styles.tbCell}>
              City
            </TableCell>
            <TableCell className={sm ? styles.noTbCell : styles.tbCell}>
              State
            </TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {branches.map((branch) => (
            <TableRow key={branch.id}>
              <TableCell>{branch.name}</TableCell>
              <TableCell className={sm || md ? styles.noTbCell : styles.tbCell}>
                {branch.address}
              </TableCell>
              <TableCell>{branch.township}</TableCell>
              <TableCell className={sm || md ? styles.noTbCell : styles.tbCell}>
                {branch.city}
              </TableCell>
              <TableCell className={sm ? styles.noTbCell : styles.tbCell}>
                {branch.state}
              </TableCell>
              <TableCell>
                <IconButton
                  aria-label={`view ${branch.name} data`}
                  color="primary"
                  onClick={() => onClick(branch.id)}
                >
                  <ArrowForwardOutlinedIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default BranchesTable;
