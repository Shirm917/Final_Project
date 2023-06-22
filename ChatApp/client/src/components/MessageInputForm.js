import { useState } from "react";
import TextField from "@mui/material/TextField";
import EmojiPicker from "emoji-picker-react";

const MessageInputForm = (props) => {
  const { onSubmit, value, setValue, onChange } = props;
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleKeyDown = (event) => {
    if (!event.shiftKey && event.key === "Enter") {
      event.preventDefault();
      onSubmit(event);
    }
  };

  return (
    <div>
      <form className="chatForm" onSubmit={onSubmit}>
        <TextField
          sx={{ marginLeft: { xs: "0px", sm: "200px" } }}
          className="textfield"
          id="outlined-multiline-flexible"
          helperText={
            <div className="helperText">
              Shift + Return/Enter for new line{" "}
              <span
                className="emoji"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                role="button"
                tabIndex={0}
              >
                😊
              </span>
            </div>
          }
          value={value}
          autoComplete="off"
          multiline
          InputProps={{
            endAdornment: (
              <div>
                {showEmojiPicker && (
                  <EmojiPicker
                    onEmojiClick={(event, emojiObject) => {
                      setValue(value + emojiObject.emoji);
                    }}
                    pickerStyle={{
                      position: "absolute",
                      bottom: "50px",
                      right: "10px",
                    }}
                    searchDisabled
                    skinTonesDisabled
                    onClose={() => setShowEmojiPicker(false)}
                  />
                )}
                <button className="btn">Send</button>
              </div>
            ),
          }}
          onChange={onChange}
          onKeyDown={handleKeyDown}
        />
      </form>
    </div>
  );
};

export default MessageInputForm;
