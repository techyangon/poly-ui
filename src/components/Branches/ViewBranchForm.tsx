import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";

import InputLabel from "@mui/material/InputLabel";
import Grid from "@mui/material/Unstable_Grid2";

import useGetBranch from "../../hooks/useGetBranch";
import useBoundStore from "../../stores";
import ReadonlyInput from "../common/ReadonlyInput";

import styles from "./branches.module.scss";

function ViewBranchForm() {
  const location = useLocation();
  const { data } = useGetBranch({
    id: parseInt(location.pathname.split("/").pop()!),
  });

  const states = useBoundStore((state) => state.states);
  const cities = useBoundStore((state) => state.cities);
  const townships = useBoundStore((state) => state.townships);

  const { control, reset } = useForm({
    defaultValues: {
      address: "",
      city: "",
      createdAt: "",
      createdBy: "",
      name: "",
      state: "",
      township: "",
      updatedAt: "",
      updatedBy: "",
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        address: data.address,
        city: cities[data.state][data.city],
        createdAt: new Date(data.created_at).toLocaleDateString("en-GB"),
        createdBy: data.created_by,
        name: data.name,
        state: states[data.state],
        township: townships[data.city][data.township],
        updatedAt: new Date(data.updated_at).toLocaleDateString("en-GB"),
        updatedBy: data.updated_by,
      });
    }
  }, [data]);

  return (
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
        <InputLabel htmlFor="createdBy">Created By</InputLabel>
      </Grid>
      <Grid xs={12} md={8}>
        <ReadonlyInput control={control} name="createdBy" />
      </Grid>
      <Grid className={styles.label} xs={12} md={4}>
        <InputLabel htmlFor="updatedBy">Updated By</InputLabel>
      </Grid>
      <Grid xs={12} md={8}>
        <ReadonlyInput control={control} name="updatedBy" />
      </Grid>
      <Grid className={styles.label} xs={12} md={4}>
        <InputLabel htmlFor="createdAt">Created At</InputLabel>
      </Grid>
      <Grid xs={12} md={8}>
        <ReadonlyInput control={control} name="createdAt" />
      </Grid>
      <Grid className={styles.label} xs={12} md={4}>
        <InputLabel htmlFor="updatedAt">Updated At</InputLabel>
      </Grid>
      <Grid xs={12} md={8}>
        <ReadonlyInput control={control} name="updatedAt" />
      </Grid>
    </Grid>
  );
}

export default ViewBranchForm;
