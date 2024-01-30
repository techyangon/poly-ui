import { useEffect } from "react";
import { useForm } from "react-hook-form";

import Grid from "@mui/material/Unstable_Grid2";

import { getAllData } from "../../api";
import { useAuth } from "../../contexts/AuthContext";
import { useProfileStore } from "../../store";
import ReadonlyInput from "../common/ReadonlyInput";

import styles from "./profile.module.scss";

import type { ProfileResponse } from "../../types";

function UserInfo() {
  const { accessToken, setAccessToken, username } = useAuth();

  const userInfo = useProfileStore((state) => state.userInfo);
  const updateUserInfo = useProfileStore((state) => state.updateUserInfo);

  const { control, reset } = useForm({
    defaultValues: {
      created_at: "",
      email: "",
      role: "",
      username: "",
    },
  });

  useEffect(() => {
    void (async () => {
      try {
        const data: ProfileResponse = await getAllData(
          accessToken,
          "profile",
          0,
          10,
          username
        );
        updateUserInfo({
          created_at: new Date(data.created_at).toLocaleDateString("sv-SE"),
          email: data.email,
          id: data.id,
          name: data.name,
          role: data.role,
        });
      } catch (error) {
        if ((error as Error).message === "Expired token") setAccessToken("");
      }
    })();
  }, []);

  useEffect(() => {
    reset({
      created_at: userInfo.created_at,
      email: userInfo.email,
      role: userInfo.role,
      username: userInfo.name,
    });
  }, [userInfo]);

  return (
    <Grid className={styles.userInfo} container spacing={2}>
      <Grid xs={12} md={4}>
        <label className={styles.label} htmlFor="username">
          Username
        </label>
      </Grid>
      <Grid xs={12} md={8}>
        <ReadonlyInput control={control} name="username" />
      </Grid>
      <Grid xs={12} md={4}>
        <label className={styles.label} htmlFor="email">
          Email
        </label>
      </Grid>
      <Grid xs={12} md={8}>
        <ReadonlyInput control={control} name="email" />
      </Grid>
      <Grid xs={12} md={4}>
        <label className={styles.label} htmlFor="role">
          Role
        </label>
      </Grid>
      <Grid xs={12} md={8}>
        <ReadonlyInput control={control} name="role" />
      </Grid>
      <Grid xs={12} md={4}>
        <label className={styles.label} htmlFor="created_at">
          Joined At
        </label>
      </Grid>
      <Grid xs={12} md={8}>
        <ReadonlyInput control={control} name="created_at" />
      </Grid>
    </Grid>
  );
}

export default UserInfo;
