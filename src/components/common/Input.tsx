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

  return (
    <TextField
      InputProps={{
        readOnly: readonly ? readonly : false,
      }}
      aria-label={field.name}
      className={styles.inputField}
      error={fieldState.invalid}
      helperText={fieldState.error ? fieldState.error.message : " "}
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
