import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";

import { PASSWORD_CHECK } from "../../config";
import { useAuth } from "../../contexts/AuthContext";
import useUpdatePassword from "../../hooks/useUpdatePassword";
import useBoundStore from "../../stores";
import PasswordInput from "../common/PasswordInput";

import styles from "./profile.module.scss";

export interface UpdatePassword {
  confirm_password: string;
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
      .regex(new RegExp(/^\S*$/), {
        message: PASSWORD_CHECK.SPACES,
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

  const id = useBoundStore((state) => state.id);

  const { data, mutate, error: updateError } = useUpdatePassword();

  useEffect(() => {
    if (data) {
      setShowAlert(true);
      reset(defaultValues);
    }
  }, [data]);

  useEffect(() => {
    if (updateError) {
      setError("current_password", { message: updateError.message });
    }
  }, [updateError]);

  const onSubmit: SubmitHandler<UpdatePassword> = (data) => {
    clearErrors();

    mutate({
      accessToken: accessToken,
      payload: {
        current_password: data.current_password,
        id: id,
        new_password: data.new_password,
      },
      resource: "profile",
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
                onClose={
                  /* istanbul ignore next */
                  () => ({})
                }
                severity="success"
              >
                Your password is updated.
              </Alert>
            </Grid>
          )}
          <Grid className={styles.userInfo} container spacing={2}>
            <Grid xs={12} md={4}>
              <InputLabel className={styles.label} htmlFor="current_password">
                Current Password
              </InputLabel>
            </Grid>
            <Grid xs={12} md={8}>
              <PasswordInput control={control} name="current_password" />
            </Grid>
            <Grid xs={12} md={4}>
              <InputLabel className={styles.label} htmlFor="new_password">
                New Password
              </InputLabel>
            </Grid>
            <Grid xs={12} md={8}>
              <PasswordInput control={control} name="new_password" />
            </Grid>
            <Grid xs={12} md={4}>
              <InputLabel className={styles.label} htmlFor="confirm_password">
                Confirm Password
              </InputLabel>
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
