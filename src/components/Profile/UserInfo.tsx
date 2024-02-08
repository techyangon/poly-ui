import { useEffect } from "react";
import { useForm } from "react-hook-form";

import InputLabel from "@mui/material/InputLabel";
import Grid from "@mui/material/Unstable_Grid2";

import { useAuth } from "../../contexts/AuthContext";
import useGetUserProfile from "../../hooks/useGetUserProfile";
import useBoundStore from "../../stores";
import ReadonlyInput from "../common/ReadonlyInput";

import styles from "./profile.module.scss";

function UserInfo() {
  const { setAccessToken } = useAuth();

  const { control, reset } = useForm({
    defaultValues: {
      created_at: "",
      email: "",
      role: "",
      username: "",
    },
  });

  const { data: profileData, error: profileDataError } = useGetUserProfile();

  const updateCreatedAt = useBoundStore((state) => state.updateCreatedAt);
  const updateEmail = useBoundStore((state) => state.updateEmail);
  const updateID = useBoundStore((state) => state.updateID);
  const updateName = useBoundStore((state) => state.updateName);
  const updateRole = useBoundStore((state) => state.updateRole);

  useEffect(() => {
    if (profileData) {
      updateCreatedAt(profileData.created_at);
      updateEmail(profileData.email);
      updateID(profileData.id);
      updateName(profileData.name);
      updateRole(profileData.role);

      reset({
        created_at: new Date(profileData.created_at).toLocaleDateString(
          "sv-SE"
        ),
        email: profileData.email,
        role: profileData.role,
        username: profileData.name,
      });
    }
  }, [profileData]);

  useEffect(() => {
    if (profileDataError?.message === "Expired token") {
      setAccessToken("");
    }
  }, [profileDataError]);

  return (
    <Grid className={styles.userInfo} container spacing={2}>
      <Grid xs={12} md={4}>
        <InputLabel className={styles.label} htmlFor="username">
          Username
        </InputLabel>
      </Grid>
      <Grid xs={12} md={8}>
        <ReadonlyInput control={control} name="username" />
      </Grid>
      <Grid xs={12} md={4}>
        <InputLabel className={styles.label} htmlFor="email">
          Email
        </InputLabel>
      </Grid>
      <Grid xs={12} md={8}>
        <ReadonlyInput control={control} name="email" />
      </Grid>
      <Grid xs={12} md={4}>
        <InputLabel className={styles.label} htmlFor="role">
          Role
        </InputLabel>
      </Grid>
      <Grid xs={12} md={8}>
        <ReadonlyInput control={control} name="role" />
      </Grid>
      <Grid xs={12} md={4}>
        <InputLabel className={styles.label} htmlFor="created_at">
          Joined At
        </InputLabel>
      </Grid>
      <Grid xs={12} md={8}>
        <ReadonlyInput control={control} name="created_at" />
      </Grid>
    </Grid>
  );
}

export default UserInfo;
