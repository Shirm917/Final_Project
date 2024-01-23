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
    badgeNotifs,
    setBadgeNotifs,
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
    socket.on("msgResponse", async (fromId, message, messageUuid) => {
      setEmitMessages([...emitMessages, { fromId, message, messageUuid }]);
      if (fromId !== toUserId) {
        setBadgeNotifs([
          ...badgeNotifs,
          { from_id: fromId, message_uuid: messageUuid },
        ]);
      } else {
        await updateNotifications(messageUuid);
      }
    });

    return () => {
      socket.off("msgResponse");
    };
  }, [socket, emitMessages]);

  const updateNotifications = async (messageUuid) => {
    const notificationTitle = "singleMessage";
    try {
      await axios.put("/updateNotifications", {
        messageUuid,
        notificationTitle,
      });
    } catch (err) {}
  };

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
