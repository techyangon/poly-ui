import { FieldValues, useController } from "react-hook-form";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";

import styles from "./input.module.scss";

import type { InputProps } from "./Input";

function ReadonlyInput<T extends FieldValues>({
  control,
  name,
}: InputProps<T>) {
  const { field } = useController({
    control: control,
    name: name,
  });

  return (
    <TextField
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton edge="end">
              <LockOutlinedIcon />
            </IconButton>
          </InputAdornment>
        ),
        readOnly: true,
      }}
      aria-label={field.name}
      className={styles.inputField}
      fullWidth={true}
      helperText=" "
      id={field.name}
      hiddenLabel={true}
      name={field.name}
      onChange={field.onChange}
      size="small"
      type="text"
      value={field.value}
      variant="filled"
    />
  );
}

export default ReadonlyInput;
