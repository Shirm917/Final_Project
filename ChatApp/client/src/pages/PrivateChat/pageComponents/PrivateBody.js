import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../contexts/AppContext";
import { socket } from "../../../utils/socket";
import axios from "axios";

const PrivateBody = () => {
  const {
    emitMessages,
    setEmitMessages,
    fromUserId,
    toUserId,
    showChat,
    messagesEnd,
    scroll,
  } = useContext(AppContext);
  const [dbMessages, setDbMessages] = useState([]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await axios.get(`/messages/${fromUserId}/${toUserId}`);
        setDbMessages(response.data.messages);
      } catch (err) {}
    };

    getMessages();
  }, [toUserId]);

  useEffect(() => {
    socket.on("msgResponse", (fromId, message, messageUuid) => {
      setEmitMessages([...emitMessages, { fromId, message, messageUuid }]);
    });

    return () => {
      socket.off("msgResponse");
    };
  }, [socket, emitMessages]);

  useEffect(() => {
    scroll();
  }, [dbMessages, emitMessages]);

  return !showChat ? (
    ""
  ) : (
    <section className="bodyContainer">
      <ul className="messagesContainer">
        {!dbMessages || dbMessages.length === 0
          ? null
          : dbMessages.map((element) => {
              const value = element.from_id === fromUserId ? "fromId" : "toId";
              return (
                <li key={element.messages_id} className={value}>
                  {element.message}
                </li>
              );
            })}
        {emitMessages.map((element, index) => {
          const value = element.fromId === fromUserId ? "fromId" : "toId";
          return element.fromId === toUserId ||
            element.fromId === fromUserId ? (
            <li key={index} className={value}>
              {element.message}
            </li>
          ) : null;
        })}
      </ul>
      <div ref={messagesEnd} />
    </section>
  );
};

export default PrivateBody;
