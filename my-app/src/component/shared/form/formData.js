import { FormControl } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";
export default function FormInput({
  name,
InputProps,
  control,
  label,
  inputType,
  className,
  placeholder,
  errors
}) {
  return (
    <FormControl fullWidth>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field, fieldState }) => (
          <TextField
            InputLabelProps={{ shrink: true }}
            {...field}
            className={className}
            label={label}
            placeholder={placeholder}
            type={inputType}
            variant="outlined"
            InputProps={InputProps}
            error={!!errors?.[name]}
            helperText={errors?.[name]?.message}
          />
        )}
      />
    </FormControl>
  );
}