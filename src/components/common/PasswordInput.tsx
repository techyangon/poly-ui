import { MouseEvent, useState } from "react";
import { FieldValues, useController } from "react-hook-form";

import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";

import styles from "./input.module.scss";

import type { InputProps } from "./Input";

function PasswordInput<T extends FieldValues>({
  control,
  name,
}: InputProps<T>) {
  const { field, fieldState } = useController({
    control: control,
    name: name,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleToggleVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDown = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <TextField
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              edge="end"
              onClick={handleToggleVisibility}
              onMouseDown={handleMouseDown}
            >
              {showPassword ? (
                <VisibilityOutlinedIcon />
              ) : (
                <VisibilityOffOutlinedIcon />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
      aria-label={field.name}
      className={styles.inputField}
      error={fieldState.invalid}
      fullWidth={true}
      helperText={fieldState.error ? fieldState.error.message : " "}
      id={field.name}
      hiddenLabel={true}
      name={field.name}
      onChange={field.onChange}
      size="small"
      type={showPassword ? "text" : "password"}
      value={field.value}
      variant="filled"
    />
  );
}

export default PasswordInput;
