import {useState,useEffect} from "react";
import io from "socket.io-client";
import ChatSidebar from "./ChatSidebar";
// What's not a compoenent here is the chatbody
// socket compoennt will hold all chat things, it will contain chatsidebar, chatbody, and chat input, 
// so in the props we send chat text the setText state so we can do the on change and on submit there
// in the props of chat body we send the messages array so we can map through them
let socket = io.connect("/");

function Socket() {
  // const [data,setData] = useState("");
  // const [isConnected, setIsConnected] = useState(socket.connected);
  const [text,setText] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // socket.on("connect", () => {
    //   setIsConnected(true);
    // });

    // socket.on("disconnect", () => {
    //   setIsConnected(false);
    // });

    // socket.on("chat message", (msg) => {
    //   messages.push(msg);
    // });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    }

  },[]);

  useEffect(() => {
    socket.on("msgResponse", (message) => {
      setMessages([...messages, message]);
    });
    return () => {
      socket.off("msgResponse");
    }
  },[socket,messages])
  
  const sendMessage = (event) => {
    event.preventDefault();
    if (text) {
      socket.emit("chat message", text);
    }
    setText("");
  }

  return (
    <div>
      <div>
        <ChatSidebar/>
      </div>
      <div className="chatBody">
        {/* <h1>Connected: {isConnected.toString()}</h1> */}
        <ul id="messages">
          {
            messages.map(message => {
              return (
                <li>{message}</li>
              )
            })
          }
        </ul>
        <form id="form" onSubmit={sendMessage}>
          <input type="text" id="input" autoComplete="off" onChange={(event) => setText(event.target.value)}/>
          <input type="submit" value="send" />
        </form>
      </div>
    </div>
  );
}

export default Socket;