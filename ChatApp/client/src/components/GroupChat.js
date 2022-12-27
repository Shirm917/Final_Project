import {useState,useEffect,useContext} from "react";
import JoinRoom from "./JoinRoom";
import { AppContext } from "../App";

// make something here when drawer disspaears so it looks good, like the joining room name input and tempory stuff here, maybe a button to bo 
// change css 
const GroupChat = () => {
    const {roomName} = useContext(AppContext);
    return (
        <div>
            <JoinRoom/>
            <form id="form">
                <input type="text" />
                <button>Send</button>
            </form>
       </div>
    )
};

export default GroupChat;