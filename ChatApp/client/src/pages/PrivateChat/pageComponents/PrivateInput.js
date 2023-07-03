import { useEffect, useContext } from "react";
import axios from "axios";
import { socket } from "../../../utils/socket";
import { AppContext } from "../../../contexts/AppContext";
import MessageInputForm from "../../../components/MessageInputForm";

const PrivateInput = () => {
  const { fromUserId, toUserId, showChat, fromUsername, text, setText } =
    useContext(AppContext);

  useEffect(() => {
    if (fromUserId) {
      socket.emit("fromUserId", fromUserId);
    }
  }, []);

  const sendMessage = () => {
    if (toUserId && text && fromUsername) {
      socket.emit("chat message", toUserId, text, fromUsername);
    }
    setText("");
  };

  const postMessage = async () => {
    const dateNow = new Date();
    if (text) {
      await axios.post("/messages", {
        text,
        fromUserId,
        toUserId,
        timestamp: dateNow.toUTCString(),
      });
    }
    setText("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage();
    postMessage();
  };

  return !showChat ? (
    ""
  ) : (
    <MessageInputForm
      onSubmit={handleSubmit}
      value={text}
      setValue={setText}
      onChange={(event) => setText(event.target.value)}
    />
  );
};

export default PrivateInput;
