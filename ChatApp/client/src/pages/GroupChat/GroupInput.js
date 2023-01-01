import {useState,useContext} from "react";
import { AppContext } from "../../App";
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

    return (
        <div>
            <form className="chatForm" onSubmit={sendMessage}>
                <TextField 
                className="textfield" 
                id="outlined-multiline-flexible" 
                value={text}  
                onChange={(event) => setText(event.target.value)}
                multiline
                autoComplete="off"
                InputProps={{endAdornment: <button className="btn">Send</button>}} 
                />
            </form>
        </div>
    )
};

export default GroupInput;