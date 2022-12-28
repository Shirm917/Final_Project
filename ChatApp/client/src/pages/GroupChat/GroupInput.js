import {useState,useEffect,useContext} from "react";
import { AppContext } from "../../App";
import { socket } from "../../socket";

const GroupInput = () => {
    const {roomName} = useContext(AppContext);
    const [text, setText] = useState("");

    const sendMessage = (event) => {
        event.preventDefault();
        if (text) {
            socket.emit("group message", text,roomName);
        };
        setText("");
    };

    return (
        <div>
            <form id="form" onSubmit={sendMessage}>
                <input type="text" value={text} onChange={(event) => setText(event.target.value)}/>
                <button>Send</button>
            </form>
        </div>
    )
};

export default GroupInput;