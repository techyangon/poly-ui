import {
  Control,
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";

import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import styles from "./controlselect.module.scss";

import type { Location } from "../../stores/types";

interface ControlSelectProps<T extends FieldValues>
  extends UseControllerProps<T> {
  control: Control<T>;
  data: Location;
}

function ControlSelect<T extends FieldValues>({
  control,
  data,
  name,
}: ControlSelectProps<T>) {
  const { field } = useController({
    control: control,
    name: name,
  });

  const generateItems = () => {
    const items = [];
    for (const key in data) {
      items.push(
        <MenuItem key={key} value={key}>
          {data[key]}
        </MenuItem>
      );
    }
    return items;
  };

  return (
    <FormControl className={styles.input} fullWidth={true} size="small">
      <Select
        labelId={`${name}-select-label`}
        id={`${name}-select`}
        onChange={field.onChange}
        value={field.value}
        variant="filled"
      >
        <MenuItem key={0} value={0}>{`Choose a ${name}`}</MenuItem>
        {generateItems()}
      </Select>
    </FormControl>
  );
}

export default ControlSelect;
