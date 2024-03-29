import { useEffect, useContext } from "react";
import { socket } from "../../../utils/socket";
import { AppContext } from "../../../contexts/AppContext";

const GroupLog = () => {
  const { roomMsgs, setRoomMsgs, prevRoomName, messagesEnd, scroll } =
    useContext(AppContext);

  useEffect(() => {
    socket.on("roomMsg", (message) => {
      setRoomMsgs([...roomMsgs, message]);
    });

    return () => {
      socket.off("roomMsg");
    };
  }, [socket, roomMsgs]);

  useEffect(() => {
    scroll();
  }, [roomMsgs]);

  return (
    <section className="groupContainer">
      <div className="groupTitles">
        {!prevRoomName ? (
          <h3>Room Name:</h3>
        ) : (
          <h3>Room Name: {prevRoomName}</h3>
        )}
        <h3>Log:</h3>
      </div>
      <div className="groupLog">
        <ul>
          {!roomMsgs || roomMsgs.length === 0
            ? null
            : roomMsgs.map((message, index) => {
                return <li key={index}>{message}</li>;
              })}
        </ul>
        <div ref={messagesEnd} />
      </div>
    </section>
  );
};

export default GroupLog;
