import { useEffect, useContext } from "react";
import { socket } from "../utils/socket";
import { AppContext } from "../contexts/AppContext";
const Notifications = () => {
  const { messageNotifs, setMessageNotifs, scroll, messagesEnd } =
    useContext(AppContext);

  useEffect(() => {
    socket.on("notif", (messageNotif) => {
      setMessageNotifs([...messageNotifs, messageNotif]);
    });

    return () => {
      socket.off("notif");
    };
  }, [socket, messageNotifs]);

  useEffect(() => {
    scroll();
  }, [messageNotifs]);

  return (
    <section className="notifContainer">
      <div className="notifTitle">
        <h3>Notifications</h3>
      </div>
      <div className="notifs">
        <ul>
          {!messageNotifs || messageNotifs.length === 0
            ? null
            : messageNotifs.map((messageNotif, index) => {
                return <li key={index}>{messageNotif}</li>;
              })}
        </ul>
        <div ref={messagesEnd} />
      </div>
    </section>
  );
};

export default Notifications;
