import {
  Control,
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { FilledInputProps } from "@mui/material/FilledInput";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";

import styles from "./input.module.scss";

interface InputProps<T extends FieldValues> extends UseControllerProps<T> {
  control: Control<T>;
  readonly?: boolean;
  type: string;
}

function Input<T extends FieldValues>({
  control,
  name,
  readonly,
  type,
}: InputProps<T>) {
  const { field, fieldState } = useController({
    control: control,
    name: name,
  });

  const generateInputProps = (): Partial<FilledInputProps> => {
    if (readonly) {
      return {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton edge="end">
              <LockOutlinedIcon />
            </IconButton>
          </InputAdornment>
        ),
        readOnly: readonly,
      };
    }
    return {};
  };

  return (
    <TextField
      InputProps={generateInputProps()}
      aria-label={field.name}
      className={readonly ? styles.readonlyField : styles.inputField}
      error={fieldState.invalid}
      fullWidth={true}
      helperText={
        readonly ? "" : fieldState.error ? fieldState.error.message : " "
      }
      id={field.name}
      hiddenLabel={true}
      name={field.name}
      onChange={field.onChange}
      size="small"
      type={type}
      value={field.value}
      variant="filled"
    />
  );
}

export default Input;
