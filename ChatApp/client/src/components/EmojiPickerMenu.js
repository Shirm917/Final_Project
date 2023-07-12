import EmojiPicker from "emoji-picker-react";

const EmojiPickerMenu = (props) => {
  const { closeEmojiPicker, onEmojiClick } = props;
  return (
    <div className="emojiPickerContainer">
      <button className="btn" onClick={closeEmojiPicker}>
        Close
      </button>
      <EmojiPicker onEmojiClick={onEmojiClick} width={250} height={320} />
    </div>
  );
};

export default EmojiPickerMenu;
