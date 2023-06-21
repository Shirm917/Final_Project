import TextField from "@mui/material/TextField";

const MessageInputForm = (props) => {
  const { onSubmit, value, onChange } = props;

  const handleKeyDown = (event) => {
    if (!event.shiftKey && event.key === "Enter") {
      event.preventDefault();
      onSubmit(event);
    }
  };

  return (
    <form className="chatForm" onSubmit={onSubmit}>
      <TextField
        sx={{ marginLeft: { xs: "0px", sm: "200px" } }}
        className="textfield"
        id="outlined-multiline-flexible"
        helperText="Shift + Return/Enter for new line"
        value={value}
        autoComplete="off"
        multiline
        InputProps={{ endAdornment: <button className="btn">Send</button> }}
        onChange={onChange}
        onKeyDown={handleKeyDown}
      />
    </form>
  );
};

export default MessageInputForm;
