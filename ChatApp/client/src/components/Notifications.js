import {useState,useEffect,useContext} from "react";
import { socket } from "../utils/socket";
import { AppContext } from "../App";

const Notifications = () => {
    const {notifs,setNotifs} = useContext(AppContext);

    useEffect(() => {
        socket.on("notif", (notif) => {
            setNotifs([...notifs,notif]);
        });
        
        return () => {
          socket.off("notif");
        };
      },[socket,notifs]);

    return (
        <div className="notifContainer">
            <div className="notifTitle">
                <h3>Notifications</h3>
            </div>
            <div className="notifs">
                <ul>
                {
                    !notifs || notifs.length === 0 ? null
                    :
                    notifs.map((notif,index) => {
                        return (
                            <li key={index}>{notif}</li>
                        )
                    })
                }
                </ul>
            </div>
        </div>
    )
};

export default Notifications;