import {useState,useEffect,useContext} from "react";
import {socket} from "../../Utils/socket";
import { AppContext } from "../../App";
import axios from "axios";

// the post/insert of the messages to the db gets done here
// When they log in they should only see the users to pick one to type to
// Shouldn't be able to see chat input when I haven't clicked on user
// set state to true and false and it only shows on true
// do like username is equal to socket.id so whenever that username pops up it's equal to the socket.id
// when emitting a message check if username isn't null if it's null that means that user isn't online and we only post the message to the db
// also can double check with socket.connected

const ChatInput = () => {
    const {fromUserId,toUserId,showChat,fromUsername} = useContext(AppContext);
    const [text,setText] = useState("");

    // only connects once we get to chat and we are logged in

  useEffect(() => {
    if (fromUserId) {
        socket.emit("fromUserId", fromUserId);
    };
  },[]);

  const sendMessage = () => {
    if (toUserId,text,fromUsername) {
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

  return (
    !showChat ? ""
    :
    <form className="chatForm" onSubmit={handleSubmit}>
      <input type="text" value={text} onChange={(event) => setText(event.target.value)}/>
      <button>Send</button>
    </form>
  );
}

export default ChatInput;