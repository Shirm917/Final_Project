import { useEffect, useContext } from "react";
import { socket } from "../../../utils/socket";
import { AppContext } from "../../../contexts/AppContext";

const GroupBody = () => {
  const {
    groupEmitMessages,
    setGroupEmitMessages,
    fromUserId,
    messagesEnd,
    scroll,
  } = useContext(AppContext);

  useEffect(() => {
    socket.on("group msgResponse", (message, fromId, fromUsername) => {
      setGroupEmitMessages([
        ...groupEmitMessages,
        { message, fromId, fromUsername },
      ]);
    });

    return () => {
      socket.off("group msgResponse");
    };
  }, [socket, groupEmitMessages]);

  useEffect(() => {
    scroll();
  }, [groupEmitMessages]);

  return (
    <section className="bodyContainer">
      <ul className="messagesContainer">
        {!groupEmitMessages || groupEmitMessages.length === 0
          ? null
          : groupEmitMessages.map((element, index) => {
              const value = fromUserId === element.fromId ? "fromId" : "toId";
              return (
                <li key={index} className={value}>
                  {element.fromUsername}: {element.message}
                </li>
              );
            })}
      </ul>
      <div ref={messagesEnd} />
    </section>
  );
};

export default GroupBody;
