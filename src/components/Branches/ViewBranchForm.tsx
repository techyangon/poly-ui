import { useForm } from "react-hook-form";

import Grid from "@mui/material/Unstable_Grid2";

import ReadonlyInput from "../common/ReadonlyInput";

import type { Branch } from "../../hooks/useGetBranches";

interface ViewBranchFormProps {
  branch: Branch;
}

function ViewBranchForm({ branch }: ViewBranchFormProps) {
  const { control } = useForm({
    defaultValues: {
      address: branch.address,
      city: branch.city,
      createdBy: branch.created_by,
      name: branch.name,
      township: branch.township,
      state: branch.state,
      updatedAt: new Date(branch.updated_at).toLocaleDateString("en-GB"),
    },
  });

  return (
    <Grid container spacing={2}>
      <Grid xs={12}>
        <label htmlFor="name">Name</label>
      </Grid>
      <Grid xs={12}>
        <ReadonlyInput control={control} name="name" />
      </Grid>
      <Grid xs={12}>
        <label htmlFor="address">Address</label>
      </Grid>
      <Grid xs={12}>
        <ReadonlyInput control={control} name="address" />
      </Grid>
      <Grid xs={12}>
        <label htmlFor="township">Township</label>
      </Grid>
      <Grid xs={12}>
        <ReadonlyInput control={control} name="township" />
      </Grid>
      <Grid xs={12}>
        <label htmlFor="city">City</label>
      </Grid>
      <Grid xs={12}>
        <ReadonlyInput control={control} name="city" />
      </Grid>
      <Grid xs={12}>
        <label htmlFor="state">State</label>
      </Grid>
      <Grid xs={12}>
        <ReadonlyInput control={control} name="state" />
      </Grid>
      <Grid xs={12}>
        <label htmlFor="createdBy">Created By</label>
      </Grid>
      <Grid xs={12}>
        <ReadonlyInput control={control} name="createdBy" />
      </Grid>
      <Grid xs={12}>
        <label htmlFor="updatedAt">Updated At</label>
      </Grid>
      <Grid xs={12}>
        <ReadonlyInput control={control} name="updatedAt" />
      </Grid>
    </Grid>
  );
}

export default ViewBranchForm;
