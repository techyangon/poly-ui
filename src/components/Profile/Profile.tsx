import { SubmitHandler, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";

import Input from "../common/Input";

import UserInfo from "./UserInfo";

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
        message: "Must contain at least one uppercase.",
      })
      .regex(new RegExp(/.*[a-z].*/), {
        message: "Must contain at least one lowercase.",
      })
      .regex(new RegExp(/.*[0-9].*/), {
        message: "Must contain at least one digit.",
      })
      .regex(new RegExp(/.*[\W].*/), {
        message: "Must contain at least one special character.",
      }),
    confirm_password: z.string(),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords don't match.",
    path: ["confirm_password"],
  });

function Profile() {
  const { clearErrors, control, handleSubmit } = useForm({
    defaultValues: {
      confirm_password: "",
      current_password: "",
      new_password: "",
    },
    resolver: zodResolver(updatePasswordRules),
  });

  const onSubmit: SubmitHandler<UpdatePassword> = (data) => {
    clearErrors();
    console.log(data);
  };

  return (
    <Container className={styles.container} maxWidth="md">
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          aria-controls="profile"
          expandIcon={<ExpandMoreIcon />}
          id="profile"
        >
          <Typography variant="h4">Profile</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <UserInfo />
        </AccordionDetails>
      </Accordion>
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
            <Grid className={styles.userInfo} container spacing={2}>
              <Grid xs={12} md={4}>
                <label className={styles.label} htmlFor="current_password">
                  Current Password
                </label>
              </Grid>
              <Grid xs={12} md={8}>
                <Input control={control} name="current_password" type="text" />
              </Grid>
              <Grid xs={12} md={4}>
                <label className={styles.label} htmlFor="new_password">
                  New Password
                </label>
              </Grid>
              <Grid xs={12} md={8}>
                <Input control={control} name="new_password" type="text" />
              </Grid>
              <Grid xs={12} md={4}>
                <label className={styles.label} htmlFor="confirm_password">
                  Confirm Password
                </label>
              </Grid>
              <Grid xs={12} md={8}>
                <Input control={control} name="confirm_password" type="text" />
              </Grid>
            </Grid>
          </form>
        </AccordionDetails>
        <AccordionActions>
          <Button form="update_passsword" type="submit" variant="contained">
            Save
          </Button>
          <Button form="update_passsword" type="button" variant="outlined">
            Cancel
          </Button>
        </AccordionActions>
      </Accordion>
    </Container>
  );
}

export default Profile;
