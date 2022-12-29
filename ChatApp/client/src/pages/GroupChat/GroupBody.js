import {useState,useEffect,useContext} from "react";
import { socket } from "../../socket";
import { AppContext } from "../../App";

const GroupBody = () => {
    const {groupEmitMessages,setGroupEmitMessages,prevRoomName,fromUserId} = useContext(AppContext);

    useEffect(() => {
        socket.on("group msgResponse", (message,fromId) => {
            setGroupEmitMessages([...groupEmitMessages, {message,fromId}]);
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
                    groupEmitMessages.map(element => {
                        const value = fromUserId === element.fromId ? "fromId" : "toId";
                        return (
                            <li className={value}>{element.message}</li>
                        )
                    })
                }
            </ul>
        </div>
    );
};

export default GroupBody;