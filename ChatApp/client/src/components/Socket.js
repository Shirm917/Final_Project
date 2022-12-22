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

  useEffect(() => {
    console.log(showChat);
    setText("");
  },[showChat])

  const postMessage = async() => {
    const dateNow = new Date();
    await axios.post("/messages", {
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
  if (!showChat) return null;
  return (
    // !showChat ? ""
    // :
    <div>
      <form id="form" onSubmit={handleSubmit}>
        <input type="text" id="input" value={text} onChange={(event) => setText(event.target.value)}/>
        <input type="submit" value="send" />
      </form>
    </div>
  );
}

export default Socket;