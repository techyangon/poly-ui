import { SubmitHandler, useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";

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

  const { accessToken, setAccessToken, setUsername } = useAuth();

  const { data, mutate, error: loginError } = usePostLogin();

  if (data) {
    setAccessToken(data.access_token);
    setUsername(data.name);
  }

  if (accessToken) {
    return <Navigate to="/home/profile" replace={true} />;
  }

  if (loginError) {
    setError("root.serverError", { type: "401", message: loginError.message });
  }

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
        <form
          className={styles.formContainer}
          onSubmit={handleSubmit(onSubmit)}
        >
          <label htmlFor="email">Email</label>
          <Input control={control} name="email" />
          <label htmlFor="password">Password</label>
          <PasswordInput control={control} name="password" />
          <Button
            className={styles.formField}
            type="submit"
            variant="contained"
          >
            Login
          </Button>
          {errors.root && (
            <Alert severity="error">{errors.root.serverError.message}</Alert>
          )}
        </form>
      </Box>
    </Container>
  );
}

export default Login;
