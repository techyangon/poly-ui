import {
  Control,
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";

import TextField from "@mui/material/TextField";

import styles from "./input.module.scss";

interface InputProps<T extends FieldValues> extends UseControllerProps<T> {
  control: Control<T>;
  label: string;
  type: string;
}

function Input<T extends FieldValues>({
  control,
  label,
  name,
  type,
}: InputProps<T>) {
  const {
    field: { onChange },
    fieldState: { error, invalid },
  } = useController({
    control: control,
    name: name,
  });

  return (
    <TextField
      aria-label={name}
      className={styles.inputField}
      error={invalid}
      helperText={error ? error.message : " "}
      id={name}
      label={label}
      name={name}
      onChange={onChange}
      type={type}
      variant="filled"
    />
  );
}

export default Input;
