import {useState,useEffect,useContext} from "react";
import io from "socket.io-client";
import { AppContext } from "../App";
import axios from "axios";

// the post/insert of the messages to the db gets done here
// When they log in they should only see the users to pick one to type to
// Shouldn't be able to see chat input when I haven't clicked on user
// set state to true and false and it only shows on true

let socket = io.connect("/");

const Socket = () => {
  const {emitMessages, setEmitMessages,fromUserId,toUserId,showChat} = useContext(AppContext);
  const [text,setText] = useState("");

  useEffect(() => {
    socket.on("msgResponse", (message) => {
      setEmitMessages([...emitMessages, message]);
    });
    return () => {
      socket.off("msgResponse");
    }
  },[socket,emitMessages])
  
  const sendMessage = () => {
    if (text) {
      socket.emit("chat message", text);
    };
    setText("");
  };

  const postMessage = () => {
    const dateNow = new Date();
    axios.post("/messages", {
      text,
      fromUserId,
      toUserId,
      timestamp: dateNow.toUTCString()
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage();
    postMessage();
  };
 
  return (
    !showChat ? null 
    :
    <div>
      <form id="form" onSubmit={handleSubmit}>
        <input type="text" id="input" autoComplete="off" onChange={(event) => setText(event.target.value)} value={text}/>
        <input type="submit" value="send" />
      </form>
    </div>
  );
}

export default Socket;