import {useState,useEffect,useContext} from "react";
import { socket } from "../../socket";
import { AppContext } from "../../App";

const GroupLog = () => {
    const {roomMsgs,setRoomMsgs} = useContext(AppContext);

    useEffect(() => {
        socket.on("roomMsg", message => {
            setRoomMsgs([...roomMsgs, message]);
        });

        return () => {
            socket.off("roomMsg");
        };
    },[socket,roomMsgs])
    
    return (
        !roomMsgs || roomMsgs.length === 0 ? null 
        :
        <div>
            <ul>
                {
                    roomMsgs.map(message => {
                        return (
                            <li>{message}</li>
                        );
                    })
                }
            </ul>
        </div>
    )
};

export default GroupLog;