import { useForm } from "react-hook-form";

import InputLabel from "@mui/material/InputLabel";
import Grid from "@mui/material/Unstable_Grid2";

import useBoundStore from "../../stores";
import ReadonlyInput from "../common/ReadonlyInput";

import styles from "./branches.module.scss";

import type { BranchDetails } from "../../hooks/useGetBranch";

interface ViewBranchFormProps {
  branch: BranchDetails;
}

function ViewBranchForm({ branch }: ViewBranchFormProps) {
  const states = useBoundStore((state) => state.states);
  const cities = useBoundStore((state) => state.cities);
  const townships = useBoundStore((state) => state.townships);

  const { control } = useForm({
    defaultValues: {
      address: branch.address,
      city: cities[branch.state][branch.city],
      created_at: new Date(branch.created_at).toLocaleDateString("en-GB"),
      created_by: branch.created_by,
      name: branch.name,
      state: states[branch.state],
      township: townships[branch.city][branch.township],
      updated_at: new Date(branch.updated_at).toLocaleDateString("en-GB"),
      updated_by: branch.updated_by,
    },
  });

  return (
    <form id={styles.viewBranch}>
      <Grid container={true} spacing={2}>
        <Grid className={styles.label} xs={12} md={4}>
          <InputLabel htmlFor="name">Name</InputLabel>
        </Grid>
        <Grid xs={12} md={8}>
          <ReadonlyInput control={control} name="name" />
        </Grid>
        <Grid className={styles.label} xs={12} md={4}>
          <InputLabel htmlFor="address">Address</InputLabel>
        </Grid>
        <Grid xs={12} md={8}>
          <ReadonlyInput control={control} name="address" />
        </Grid>
        <Grid className={styles.label} xs={12} md={4}>
          <InputLabel htmlFor="state">State</InputLabel>
        </Grid>
        <Grid xs={12} md={8}>
          <ReadonlyInput control={control} name="state" />
        </Grid>
        <Grid className={styles.label} xs={12} md={4}>
          <InputLabel htmlFor="city">City</InputLabel>
        </Grid>
        <Grid xs={12} md={8}>
          <ReadonlyInput control={control} name="city" />
        </Grid>
        <Grid className={styles.label} xs={12} md={4}>
          <InputLabel htmlFor="township">Township</InputLabel>
        </Grid>
        <Grid xs={12} md={8}>
          <ReadonlyInput control={control} name="township" />
        </Grid>
        <Grid className={styles.label} xs={12} md={4}>
          <InputLabel htmlFor="created_by">Created By</InputLabel>
        </Grid>
        <Grid xs={12} md={8}>
          <ReadonlyInput control={control} name="created_by" />
        </Grid>
        <Grid className={styles.label} xs={12} md={4}>
          <InputLabel htmlFor="updated_by">Updated By</InputLabel>
        </Grid>
        <Grid xs={12} md={8}>
          <ReadonlyInput control={control} name="updated_by" />
        </Grid>
        <Grid className={styles.label} xs={12} md={4}>
          <InputLabel htmlFor="created_at">Created At</InputLabel>
        </Grid>
        <Grid xs={12} md={8}>
          <ReadonlyInput control={control} name="created_at" />
        </Grid>
        <Grid className={styles.label} xs={12} md={4}>
          <InputLabel htmlFor="updated_at">Updated At</InputLabel>
        </Grid>
        <Grid xs={12} md={8}>
          <ReadonlyInput control={control} name="updated_at" />
        </Grid>
      </Grid>
    </form>
  );
}

export default ViewBranchForm;
