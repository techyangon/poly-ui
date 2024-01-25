import { SubmitHandler, useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";

import { postLoginData } from "../../api";
import { AUTH_CHECK } from "../../config";
import { useAuth } from "../../contexts/AuthContext";
import Input from "../common/Input";

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
  password: z.string().min(8, { message: AUTH_CHECK.PASSWORD.LENGTH }),
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

  const login = useMutation({
    mutationFn: postLoginData,
    onError: (error) =>
      setError("root.serverError", { type: "401", message: error.message }),
    onSuccess: (data) => {
      setAccessToken(data.access_token);
      setUsername(data.name);
    },
  });

  if (accessToken) {
    return <Navigate to="/home/profile" replace={true} />;
  }

  const onSubmit: SubmitHandler<LoginInput> = (data) => {
    clearErrors();

    const payload = new FormData();
    payload.append("username", data.email);
    payload.append("password", data.password);

    login.mutate(payload);
  };

  return (
    <Container className={styles.mainContainer} component="main">
      <CssBaseline />
      <Box>
        <form
          className={styles.formContainer}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input control={control} label="Email" name="email" type="text" />
          <Input
            control={control}
            label="Password"
            name="password"
            type="password"
          />
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
