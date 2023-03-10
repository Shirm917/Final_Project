import {useState,useEffect,useContext} from "react";
import {socket} from "../../utils/socket";
import { AppContext } from "../../App";
import axios from "axios";
import TextField from '@mui/material/TextField';

const ChatInput = () => {
  const {fromUserId,toUserId,showChat,fromUsername} = useContext(AppContext);
  const [text,setText] = useState("");


  useEffect(() => {
    if (fromUserId) {
        socket.emit("fromUserId", fromUserId);
    };
  },[]);

  const sendMessage = () => {
    if (toUserId && text && fromUsername) {
      socket.emit("chat message", toUserId,text,fromUsername);
    };
    setText("");
  };

  const postMessage = async() => {
    const dateNow = new Date();
    if (text){
      await axios.post("/messages", {
        text,
        fromUserId,
        toUserId,
        timestamp: dateNow.toUTCString()
      });
    }
    setText("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage();
    postMessage();
  };

  const handleKeyDown = (event) => {
    if (!event.shiftKey && event.key === "Enter") {
      event.preventDefault();
      handleSubmit(event);
    }
  }

  return (
    !showChat ? ""
    :
    <form className="chatForm" onSubmit={handleSubmit}>
      <TextField 
      className="textfield" 
      id="outlined-multiline-flexible" 
      value={text} 
      autoComplete="off"
      multiline
      InputProps={{endAdornment: <button className="btn">Send</button>}} 
      onChange={(event) => setText(event.target.value)} 
      onKeyDown={handleKeyDown}
      />
    </form>
  );
}

export default ChatInput;