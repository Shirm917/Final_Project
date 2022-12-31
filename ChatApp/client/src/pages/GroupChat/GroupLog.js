import {useState,useEffect,useContext} from "react";
import { socket } from "../../Utils/socket";
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
                    roomMsgs.map((message,index) => {
                        return (
                            <li key={index}>{message}</li>
                        );
                    })
                }
            </ul>
        </div>
    )
};

export default GroupLog;