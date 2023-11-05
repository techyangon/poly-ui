import { SubmitHandler, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";

import Input from "../common/Input";

import styles from "./login.module.scss";

interface LoginInput {
  email: string;
  password: string;
}

const loginRules = z.object({
  email: z.string().trim().min(1, { message: "Email cannot be empty" }).email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

function Login() {
  const { control, handleSubmit } = useForm<LoginInput>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginRules),
  });

  const onSubmit: SubmitHandler<LoginInput> = (data) => console.log(data);

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
          <Button type="submit" variant="contained">
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default Login;
