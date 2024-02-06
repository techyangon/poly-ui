import { useEffect } from "react";
import { useForm } from "react-hook-form";

import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import Grid from "@mui/material/Unstable_Grid2";

import useBoundStore from "../../stores";
import ControlSelect from "../common/ControlSelect";
import Input from "../common/Input";
import ReadonlyInput from "../common/ReadonlyInput";

import type { Branch } from "../../hooks/useGetBranches";

interface EditBranchFormProps {
  branch: Branch;
}

function EditBranchForm({ branch }: EditBranchFormProps) {
  const states = useBoundStore((state) => state.states);
  const cities = useBoundStore((state) => state.cities);
  const townships = useBoundStore((state) => state.townships);

  const defaultStateID = Object.keys(states).filter(
    (key) => states[parseInt(key)] === branch.state
  )[0];
  const defaultCityID = Object.keys(cities[parseInt(defaultStateID)]).filter(
    (cityID) =>
      cities[parseInt(defaultStateID)][parseInt(cityID)] === branch.city
  )[0];
  const defaultTspID = Object.keys(townships[parseInt(defaultCityID)]).filter(
    (tspID) =>
      townships[parseInt(defaultCityID)][parseInt(tspID)] === branch.township
  )[0];

  const { control, setValue, watch } = useForm({
    defaultValues: {
      address: branch.address,
      city: defaultCityID,
      createdBy: branch.created_by,
      name: branch.name,
      state: defaultStateID,
      township: defaultTspID,
      updatedAt: new Date(branch.updated_at).toLocaleDateString("en-GB"),
    },
  });

  const selectedState = watch("state");
  const selectedCity = watch("city");

  useEffect(() => {
    if (selectedState === defaultStateID) {
      setValue("city", defaultCityID);
    } else {
      setValue("city", "0");
    }
  }, [selectedState]);

  useEffect(() => {
    if (selectedCity === defaultCityID) {
      setValue("township", defaultTspID);
    } else {
      setValue("township", "0");
    }
  }, [selectedCity]);

  return (
    <form id="edit-branch">
      <Grid container={true} spacing={2}>
        <Grid xs={12}>
          <label htmlFor="name">Name</label>
        </Grid>
        <Grid xs={12}>
          <Input control={control} name="name" />
        </Grid>
        <Grid xs={12}>
          <label htmlFor="address">Address</label>
        </Grid>
        <Grid xs={12}>
          <Input control={control} name="address" />
        </Grid>
        <Grid xs={12}>
          <InputLabel id="state-select-label">State</InputLabel>
        </Grid>
        <Grid xs={12}>
          <ControlSelect control={control} data={states} name="state" />
        </Grid>
        <Grid xs={12}>
          <InputLabel id="city-select-label">City</InputLabel>
        </Grid>
        <Grid xs={12}>
          <ControlSelect
            control={control}
            data={cities[parseInt(selectedState)]}
            name="city"
          />
        </Grid>
        <Grid xs={12}>
          <InputLabel id="township-select-label">Township</InputLabel>
        </Grid>
        <Grid xs={12}>
          <ControlSelect
            control={control}
            data={townships[parseInt(selectedCity)]}
            name="township"
          />
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
        <Grid xs={12}>
          <Button fullWidth={true} type="submit" variant="contained">
            Save
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default EditBranchForm;
