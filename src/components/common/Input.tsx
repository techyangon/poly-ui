import {
  Control,
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";

import TextField from "@mui/material/TextField";

import styles from "./input.module.scss";

export interface InputProps<T extends FieldValues>
  extends UseControllerProps<T> {
  control: Control<T>;
}

function Input<T extends FieldValues>({ control, name }: InputProps<T>) {
  const { field, fieldState } = useController({
    control: control,
    name: name,
  });

  return (
    <TextField
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
      type="text"
      value={field.value}
      variant="filled"
    />
  );
}

export default Input;
