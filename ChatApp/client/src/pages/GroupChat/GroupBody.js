import {useState,useEffect,useContext} from "react";
import { socket } from "../../socket";
import { AppContext } from "../../App";

const GroupBody = () => {
    const {groupEmitMessages,setGroupEmitMessages,prevRoomName} = useContext(AppContext);

    useEffect(() => {
        socket.on("group msgResponse", message => {
            setGroupEmitMessages([...groupEmitMessages, message]);
        });

        return () => {
            socket.off("group msgResponse");
        };
    },[socket,groupEmitMessages]);

    return (
        <div>
            {
                !prevRoomName ? null 
                :
                <p>Room: {prevRoomName}</p>
            }
            <ul>
                {
                    !groupEmitMessages || groupEmitMessages.length === 0 ? null
                    :
                    groupEmitMessages.map(message => {
                        return (
                            <li>{message}</li>
                        )
                    })
                }
            </ul>
        </div>
    );
};

export default GroupBody;