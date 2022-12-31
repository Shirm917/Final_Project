import { useState,createContext } from "react";
import {Routes,Route} from "react-router-dom";
import { socket } from "./utils/socket";
import Home from "./pages/Home/Home";
import ChatNavbar from "./Nav/ChatNavbar";
import Navbar from "./Nav/Navbar";
import LoginRegister from "./pages/LoginRegister/LoginRegister";
import './App.css';

export const AppContext = createContext(null);

// don't have link for chat in navbar when we successfully log in we want to be directed to chat component, so /chat,
// chat component will hold all chat things

function App() {
  const [userMsg, setUserMsg] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fromUserId,setFromUserId] = useState(null);
  const [toUserId,setToUserId] = useState(null);
  const [fromUsername,setFromUsername] = useState("")
  const [showChat,setShowChat] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [prevRoomName,setPrevRoomName] = useState("");
  const [emitMessages, setEmitMessages] = useState([]);
  const [groupEmitMessages,setGroupEmitMessages] = useState([]);
  const [roomMsgs,setRoomMsgs] = useState([]);
  const [notifs,setNotifs] = useState([]);

  const reset = () => {
    socket.emit("leave room",roomName,fromUsername);
    setToUserId(null);
    setShowChat(false);
    setRoomName("");
    setPrevRoomName("");
    setGroupEmitMessages([]);
    setRoomMsgs([]);
    setNotifs([]);
    socket.disconnect();
  }

  return (
    <AppContext.Provider value={{
      userMsg,
      setUserMsg,
      isLoggedIn,
      setIsLoggedIn,
      fromUserId,
      setFromUserId,
      toUserId,
      setToUserId,
      fromUsername,
      setFromUsername,
      showChat,
      setShowChat,
      roomName,
      setRoomName,
      emitMessages,
      setEmitMessages,
      groupEmitMessages,
      setGroupEmitMessages,
      roomMsgs,
      setRoomMsgs,
      prevRoomName,
      setPrevRoomName,
      notifs,
      setNotifs,
      reset
    }}>
      <div>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/register" element={<LoginRegister title="Register"/>}/>
          <Route path="/login" element={<LoginRegister title="Login"/>}/>
          <Route path="/chat" element={<ChatNavbar/>}/>
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;

