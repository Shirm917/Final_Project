import {useState,useEffect,useContext} from "react";
import {socket} from "../../utils/socket";
import { AppContext } from "../../App";

// regex for room name, can't start with number

const JoinRoom  = () => {
    const {setGroupEmitMessages,roomName,setRoomName,setRoomMsgs,prevRoomName,setPrevRoomName,fromUsername} = useContext(AppContext);

    const submitRoomName = (event) => {
        event.preventDefault();
        if (prevRoomName === roomName) return;
        clear();
        if (roomName) {
            socket.emit("room name", prevRoomName,roomName,fromUsername);
        };
        setPrevRoomName(roomName);
    };

    const clear = () => {
        document.getElementById("joinForm").reset();
        setGroupEmitMessages([]);
        setRoomMsgs([]);
    };

    return (
        <div>
            <form id="joinForm" onSubmit={submitRoomName}>
                <input type="text" onChange={(event) => setRoomName(event.target.value.toUpperCase())}/>
                <button>Join Room</button>
            </form>
        </div>
    )
};

export default JoinRoom;