import {useState,useEffect,useContext} from "react";
import {socket} from "../socket";
import { AppContext } from "../App";

const JoinRoom  = () => {
    const {roomName,setRoomName} = useContext(AppContext);

    const submitRoomName = (event) => {
        event.preventDefault();
        if (roomName) {
            socket.emit("room name", roomName);
        };
        setRoomName("");
    };

    return (
        <div>
            <form onSubmit={submitRoomName}>
                <input type="text" value={roomName} onChange={(event) => setRoomName(event.target.value)}/>
                <button>Join Room</button>
            </form>
        </div>
    )
};

export default JoinRoom;