import TextField from "@mui/material/TextField";

const FormInput = (props) => {
    const {id,type,label,setValue} = props;
  return (
    <TextField
      sx={{ m: 1 }}
      id={id}
      type={type}
      label={label}
      variant="outlined"
      required
      onChange={(event) => setValue(event.target.value)}
    />
  );
};

export default FormInput;
