import {useState,useContext} from "react";
import { AppContext } from "../../contexts/AppContext";
import { socket } from "../../utils/socket";
import TextField from '@mui/material/TextField';

const GroupInput = () => {
    const {roomName,fromUserId,fromUsername} = useContext(AppContext);
    const [text, setText] = useState("");

    const sendMessage = (event) => {
        event.preventDefault();
        if (text && roomName && fromUserId && fromUsername) {
            socket.emit("group message", text,roomName,fromUserId,fromUsername);
        };
        setText("");
    };

    const handleKeyDown = (event) => {
        if (!event.shiftKey && event.key === "Enter") {
          event.preventDefault();
          sendMessage(event);
        }
    }

    return (
        <div>
            <form className="chatForm" onSubmit={sendMessage}>
                <TextField
                className="textfield"
                id="outlined-multiline-flexible"
                value={text}
                multiline
                autoComplete="off"
                InputProps={{endAdornment: <button className="btn">Send</button>}}
                onChange={(event) => setText(event.target.value)}
                onKeyDown={handleKeyDown}
                />
            </form>
        </div>
    )
};

export default GroupInput;