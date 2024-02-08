import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Brightness4OutlinedIcon from "@mui/icons-material/Brightness4Outlined";
import Brightness7OutlinedIcon from "@mui/icons-material/Brightness7Outlined";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import { useColorScheme } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";

import { AUTH_CHECK } from "../../config";
import { useAuth } from "../../contexts/AuthContext";
import usePostLogin from "../../hooks/usePostLogin";
import Input from "../common/Input";
import PasswordInput from "../common/PasswordInput";

import styles from "./login.module.scss";

export interface LoginInput {
  email: string;
  password: string;
}

const loginRules = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: AUTH_CHECK.EMAIL.EMPTY })
    .email({ message: AUTH_CHECK.EMAIL.INVALID }),
  password: z.string().trim().min(1, { message: AUTH_CHECK.PASSWORD.EMPTY }),
});

function Login() {
  const {
    clearErrors,
    control,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<LoginInput>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginRules),
  });

  const { mode, setMode } = useColorScheme();

  const { setAccessToken, setUsername } = useAuth();

  const { data, mutate, error: loginError } = usePostLogin();

  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setAccessToken(data.access_token);
      setUsername(data.name);
      navigate("/home/profile", { replace: true });
    }
  }, [data]);

  useEffect(() => {
    if (loginError) {
      setError("root.serverError", {
        type: "401",
        message: loginError.message,
      });
    }
  }, [loginError]);

  const handleToggleMode = () => {
    /* istanbul ignore next */
    setMode(mode === "light" ? "dark" : "light");
  };

  const onSubmit: SubmitHandler<LoginInput> = (data) => {
    clearErrors();

    const payload = new FormData();
    payload.append("username", data.email);
    payload.append("password", data.password);

    mutate(payload);
  };

  return (
    <Container className={styles.mainContainer} component="main">
      <CssBaseline />
      <Box>
        <Box className={styles.toggleBtnContainer} component="div">
          <IconButton aria-label="switch theme" onClick={handleToggleMode}>
            {mode === "light" ? (
              <Brightness4OutlinedIcon />
            ) : (
              <Brightness7OutlinedIcon />
            )}
          </IconButton>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container={true} spacing={2}>
            <Grid xs={12}>
              <label htmlFor="email">Email</label>
            </Grid>
            <Grid xs={12}>
              <Input control={control} name="email" />
            </Grid>
            <Grid xs={12}>
              <label htmlFor="password">Password</label>
            </Grid>
            <Grid xs={12}>
              <PasswordInput control={control} name="password" />
            </Grid>
            <Grid xs={12}>
              <Button
                className={styles.formField}
                fullWidth={true}
                type="submit"
                variant="contained"
              >
                Login
              </Button>
            </Grid>
            <Grid xs={12}>
              {errors.root && (
                <Alert severity="error">
                  {errors.root.serverError.message}
                </Alert>
              )}
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}

export default Login;
