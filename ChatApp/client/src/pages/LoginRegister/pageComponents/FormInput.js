import TextField from "@mui/material/TextField";

const FormInput = (props) => {
  const { id, type, label, value, setValue } = props;
  return (
    <TextField
      className="formInput"
      sx={{
        m: 1,
      }}
      id={id}
      type={type}
      label={label}
      variant="outlined"
      required
      value={value}
      onChange={(event) => setValue(event.target.value)}
    />
  );
};

export default FormInput;
