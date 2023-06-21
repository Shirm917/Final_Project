import { useState, useContext } from "react";
import { AppContext } from "../../../contexts/AppContext";
import { socket } from "../../../utils/socket";
import MessageInputForm from "../../../components/MessageInputForm";

const GroupInput = () => {
  const { roomName, fromUserId, fromUsername } = useContext(AppContext);
  const [text, setText] = useState("");

  const sendMessage = (event) => {
    event.preventDefault();
    if (text && roomName && fromUserId && fromUsername) {
      socket.emit("group message", text, roomName, fromUserId, fromUsername);
    }
    setText("");
  };

  return (
    <MessageInputForm
      onSubmit={sendMessage}
      value={text}
      onChange={(event) => setText(event.target.value)}
    />
  );
};

export default GroupInput;
