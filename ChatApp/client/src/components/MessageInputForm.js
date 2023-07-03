import { useState } from "react";
import TextField from "@mui/material/TextField";
import EmojiPicker from "emoji-picker-react";

const MessageInputForm = (props) => {
  const { onSubmit, value, setValue, onChange } = props;
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  const handleKeyDown = (event) => {
    if (!event.shiftKey && event.key === "Enter") {
      event.preventDefault();
      setShowEmojiPicker(false);
      onSubmit(event);
    }
  };

  const onEmojiClick = (emojiObject) => {
    setSelectedEmoji(emojiObject.emoji);
    setValue(value + emojiObject.emoji);
  };

  const closeEmojiPicker = () => {
    setShowEmojiPicker(false);
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
                {selectedEmoji || "😊"}
              </span>
            </div>
          }
          value={value}
          autoComplete="off"
          multiline
          onChange={onChange}
          onKeyDown={handleKeyDown}
          InputProps={{
            endAdornment: (
              <button className="btn" onClick={closeEmojiPicker}>
                Send
              </button>
            ),
          }}
        />
      </form>
      {showEmojiPicker && (
        <div className="emojiPickerContainer">
          <button className="btn" onClick={closeEmojiPicker}>
            Close
          </button>
          <EmojiPicker onEmojiClick={onEmojiClick} />
        </div>
      )}
    </div>
  );
};

export default MessageInputForm;
