import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";

import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import Grid from "@mui/material/Unstable_Grid2";

import useGetBranch from "../../hooks/useGetBranch";
import useBoundStore from "../../stores";
import ControlSelect from "../common/ControlSelect";
import Input from "../common/Input";
import ReadonlyInput from "../common/ReadonlyInput";

import type { Location } from "../../stores/types";

function EditBranchForm() {
  const states = useBoundStore((state) => state.states);
  const cities = useBoundStore((state) => state.cities);
  const townships = useBoundStore((state) => state.townships);

  const location = useLocation();
  const { data } = useGetBranch({
    id: parseInt(location.pathname.split("/").pop()!),
  });

  const [stateID, setStateID] = useState(0);
  const [cityID, setCityID] = useState(0);
  const [tspID, setTspID] = useState(0);

  const { control, reset, setValue, watch } = useForm({
    defaultValues: {
      address: "",
      city: "0",
      createdAt: "",
      createdBy: "",
      name: "",
      state: "0",
      township: "0",
      updatedAt: "",
      updatedBy: "",
    },
  });

  const curState = watch("state", "0");
  const curCity = watch("city", "0");

  const [curCities, setCurCities] = useState({} as Location);
  const [curTsps, setCurTsps] = useState({} as Location);

  useEffect(() => {
    if (data) {
      setStateID(data.state);
      setCityID(data.city);
      setTspID(data.township);

      reset({
        address: data.address,
        city: data.city.toString(),
        createdAt: new Date(data.created_at).toLocaleDateString("en-GB"),
        createdBy: data.created_by,
        name: data.name,
        state: data.state.toString(),
        township: data.township.toString(),
        updatedAt: new Date(data.updated_at).toLocaleDateString("en-GB"),
        updatedBy: data.updated_by,
      });
    }
  }, [data]);

  useEffect(() => {
    if (parseInt(curState) !== stateID) {
      setValue("city", "0");
    } else {
      setValue("city", cityID.toString());
    }
    setCurCities(cities[parseInt(curState)]);
  }, [curState]);

  useEffect(() => {
    if (parseInt(curCity) !== cityID) {
      setValue("township", "0");
    } else {
      setValue("township", tspID.toString());
    }
    setCurTsps(townships[parseInt(curCity)]);
  }, [curCity]);

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
          <ControlSelect control={control} data={curCities} name="city" />
        </Grid>
        <Grid xs={12}>
          <InputLabel id="township-select-label">Township</InputLabel>
        </Grid>
        <Grid xs={12}>
          <ControlSelect control={control} data={curTsps} name="township" />
        </Grid>
        <Grid xs={12}>
          <label htmlFor="createdBy">Created By</label>
        </Grid>
        <Grid xs={12}>
          <ReadonlyInput control={control} name="createdBy" />
        </Grid>
        <Grid xs={12}>
          <label htmlFor="updatedBy">Updated By</label>
        </Grid>
        <Grid xs={12}>
          <ReadonlyInput control={control} name="updatedBy" />
        </Grid>
        <Grid xs={12}>
          <label htmlFor="createdAt">Created At</label>
        </Grid>
        <Grid xs={12}>
          <ReadonlyInput control={control} name="createdAt" />
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
