import { useEffect, useContext } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
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

  const sendMessage = (messageUuid) => {
    if (toUserId && text && fromUsername) {
      socket.emit("private message", toUserId, text, fromUsername, messageUuid);
    }
  };

  const postMessage = async (messageUuid) => {
    const dateNow = new Date();
    if (text) {
      await axios.post("/messages", {
        text,
        fromUserId,
        toUserId,
        timestamp: dateNow.toUTCString(),
        messageUuid,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const uuid = uuidv4();
    await postMessage(uuid);
    sendMessage(uuid);
    setText("");
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
