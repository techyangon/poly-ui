import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import Grid from "@mui/material/Unstable_Grid2";

import useBoundStore from "../../stores";
import ControlSelect from "../common/ControlSelect";
import Input from "../common/Input";
import ReadonlyInput from "../common/ReadonlyInput";

//import type { Location } from "../../stores/types";
import type { BranchDetails } from "../../hooks/useGetBranch";

interface EditBranchFormProps {
  branch: BranchDetails;
}

function EditBranchForm({ branch }: EditBranchFormProps) {
  const states = useBoundStore((state) => state.states);
  const cities = useBoundStore((state) => state.cities);
  const townships = useBoundStore((state) => state.townships);

  const { control, formState, reset, setValue, watch } = useForm({
    defaultValues: {
      address: branch.address,
      city: branch.city,
      created_at: new Date(branch.created_at).toLocaleDateString("en-GB"),
      created_by: branch.created_by,
      name: branch.name,
      state: branch.state,
      township: branch.township,
      updated_at: new Date(branch.updated_at).toLocaleDateString("en-GB"),
      updated_by: branch.updated_by,
    },
  });

  const curState = watch("state");
  const curCity = watch("city");

  const [stateID, setStateID] = useState(branch.state);
  const [cityID, setCityID] = useState(branch.city);

  useEffect(() => {
    if (formState.dirtyFields.state) {
      setValue("city", 0);
      setValue("township", 0);

      setStateID(curState);
      setCityID(0);
    }
  }, [curState]);

  useEffect(() => {
    if (formState.dirtyFields.city) {
      setValue("township", 0);

      setCityID(curCity);
    }
  }, [curCity]);

  const handleReset = () => {
    reset();
  };

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
          <ControlSelect control={control} data={cities[stateID]} name="city" />
        </Grid>
        <Grid xs={12}>
          <InputLabel id="township-select-label">Township</InputLabel>
        </Grid>
        <Grid xs={12}>
          <ControlSelect
            control={control}
            data={townships[cityID]}
            name="township"
          />
        </Grid>
        <Grid xs={12}>
          <label htmlFor="created_by">Created By</label>
        </Grid>
        <Grid xs={12}>
          <ReadonlyInput control={control} name="created_by" />
        </Grid>
        <Grid xs={12}>
          <label htmlFor="updated_by">Updated By</label>
        </Grid>
        <Grid xs={12}>
          <ReadonlyInput control={control} name="updated_by" />
        </Grid>
        <Grid xs={12}>
          <label htmlFor="created_at">Created At</label>
        </Grid>
        <Grid xs={12}>
          <ReadonlyInput control={control} name="created_at" />
        </Grid>
        <Grid xs={12}>
          <label htmlFor="updated_at">Updated At</label>
        </Grid>
        <Grid xs={12}>
          <ReadonlyInput control={control} name="updated_at" />
        </Grid>
        <Grid xs={6}>
          <Button fullWidth={true} type="submit" variant="contained">
            Save
          </Button>
        </Grid>
        <Grid xs={6}>
          <Button
            fullWidth={true}
            onClick={handleReset}
            type="button"
            variant="outlined"
          >
            Reset
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default EditBranchForm;
