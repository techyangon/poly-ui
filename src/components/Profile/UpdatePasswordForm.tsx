import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";

import { updateData } from "../../api";
import { PASSWORD_CHECK } from "../../config";
import { useAuth } from "../../contexts/AuthContext";
import { useProfileStore } from "../../store";
import PasswordInput from "../common/PasswordInput";

import styles from "./profile.module.scss";

export interface UpdatePassword {
  confirm_password: string;
  current_password: string;
  new_password: string;
}

interface UpdatePasswordPayload {
  id: number;
  current_password: string;
  new_password: string;
}

const updatePasswordRules = z
  .object({
    current_password: z.string(),
    new_password: z
      .string()
      .regex(new RegExp(/.*[A-Z].*/), {
        message: PASSWORD_CHECK.UPPER,
      })
      .regex(new RegExp(/.*[a-z].*/), {
        message: PASSWORD_CHECK.LOWER,
      })
      .regex(new RegExp(/.*[0-9].*/), {
        message: PASSWORD_CHECK.DIGIT,
      })
      .regex(new RegExp(/.*[\W].*/), {
        message: PASSWORD_CHECK.SPECIAL,
      })
      .min(8, { message: PASSWORD_CHECK.LENGTH }),
    confirm_password: z.string(),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: PASSWORD_CHECK.MATCH,
    path: ["confirm_password"],
  });

const defaultValues = {
  confirm_password: "",
  current_password: "",
  new_password: "",
};

function UpdatePasswordForm() {
  const { clearErrors, control, handleSubmit, reset, setError } = useForm({
    defaultValues: defaultValues,
    resolver: zodResolver(updatePasswordRules),
  });
  const { accessToken, username } = useAuth();
  const [showAlert, setShowAlert] = useState(false);
  const userInfo = useProfileStore((state) => state.userInfo);

  const updatePassword = useMutation({
    mutationFn: updateData<UpdatePasswordPayload>,
    onError: (error) =>
      setError("current_password", { message: error.message }),
    onSuccess: () => {
      setShowAlert(true);
      reset(defaultValues);
    },
  });

  const onSubmit: SubmitHandler<UpdatePassword> = (data) => {
    clearErrors();

    updatePassword.mutate({
      accessToken: accessToken,
      resource: "profile",
      payload: {
        id: userInfo.id,
        current_password: data.current_password,
        new_password: data.new_password,
      },
      username: username,
    });
  };

  const handleAlert = () => {
    setShowAlert(false);
  };

  return (
    <Accordion>
      <AccordionSummary
        aria-controls="security"
        expandIcon={<ExpandMoreIcon />}
        id="security"
      >
        <Typography variant="h4">Security</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <form id="update_passsword" onSubmit={handleSubmit(onSubmit)}>
          {showAlert && (
            <Grid className={styles.alertContainer} xs={12}>
              <Alert
                className={styles.alert}
                onClose={() => ({})}
                severity="success"
              >
                Your password is updated.
              </Alert>
            </Grid>
          )}
          <Grid className={styles.userInfo} container spacing={2}>
            <Grid xs={12} md={4}>
              <label className={styles.label} htmlFor="current_password">
                Current Password
              </label>
            </Grid>
            <Grid xs={12} md={8}>
              <PasswordInput control={control} name="current_password" />
            </Grid>
            <Grid xs={12} md={4}>
              <label className={styles.label} htmlFor="new_password">
                New Password
              </label>
            </Grid>
            <Grid xs={12} md={8}>
              <PasswordInput control={control} name="new_password" />
            </Grid>
            <Grid xs={12} md={4}>
              <label className={styles.label} htmlFor="confirm_password">
                Confirm Password
              </label>
            </Grid>
            <Grid xs={12} md={8}>
              <PasswordInput control={control} name="confirm_password" />
            </Grid>
          </Grid>
        </form>
      </AccordionDetails>
      <AccordionActions>
        <Button
          form="update_passsword"
          onClick={handleAlert}
          type="submit"
          variant="contained"
        >
          Save
        </Button>
        <Button form="update_passsword" type="button" variant="outlined">
          Cancel
        </Button>
      </AccordionActions>
    </Accordion>
  );
}

export default UpdatePasswordForm;
