import {useEffect,useContext} from "react";
import { socket } from "../../../utils/socket";
import { AppContext } from "../../../contexts/AppContext";

const GroupLog = () => {
    const {roomMsgs,setRoomMsgs,prevRoomName} = useContext(AppContext);

    useEffect(() => {
        socket.on("roomMsg", message => {
            setRoomMsgs([...roomMsgs, message]);
        });

        return () => {
            socket.off("roomMsg");
        };
    },[socket,roomMsgs])

    return (
        <div className="groupContainer">
            <div className="groupTitles">
                {
                    !prevRoomName ? <h3>Room Name:</h3>
                    :
                    <h3>Room Name: {prevRoomName}</h3>
                }
                <h3>Log:</h3>
            </div>
            <div className="groupLog">
                <ul>
                    {
                        !roomMsgs || roomMsgs.length === 0 ? null
                        :
                        roomMsgs.map((message,index) => {
                            return (
                                <li key={index}>{message}</li>
                            );
                        })
                    }
                </ul>
            </div>
        </div>
    )
};

export default GroupLog;