import {useState,useEffect,useContext} from "react";
import { socket } from "../socket";
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
        <div>
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
    )
};

export default Notifications;