import {useState,useEffect,useContext} from "react";
import { socket } from "../socket";

const Notifications = () => {
    const [notifs,setNotifs] = useState([]);

    useEffect(() => {
        socket.on("notif", (notif) => {
            setNotifs([...notifs,notif]);
        });
        
        return () => {
          socket.off("notif");
        };
      },[socket,notifs]);

    return (
        <div>
            <ul>
            {
                !notifs || notifs.length === 0 ? null
                :
                notifs.map(notif => {
                    return (
                        <li>{notif}</li>
                    )
                })
            }
            </ul>
        </div>
    )
};

export default Notifications;