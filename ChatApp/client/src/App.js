import { useState,createContext,useRef } from "react";
import {Routes,Route} from "react-router-dom";
import { socket } from "./utils/socket";
import axios from "axios";
import Home from "./pages/Home/Home";
import ChatNavbar from "./Nav/ChatNavbar";
import Navbar from "./Nav/Navbar";
import LoginRegister from "./pages/LoginRegister/LoginRegister";
import Protected from "./components/Protected";
import './App.css';

export const AppContext = createContext(null);

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
  const [search,setSearch] = useState("");
  const messagesEnd = useRef(null);

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
  };

  const scroll = () => {
    messagesEnd.current?.scrollIntoView({behavior: "smooth"});
  };

  // If user doesn't log out 
  const fixNotifications = async() => {
    const dateNow = new Date();
    await axios.put("/fixNotifs", {
      timestamp: dateNow.toUTCString(),
      fromUserId
    });
  };

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
      search,
      setSearch,
      reset,
      messagesEnd,
      scroll,
      fixNotifications
    }}>
      <div>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/register" element={<LoginRegister title="Register"/>}/>
          <Route path="/login" element={<LoginRegister title="Login"/>}/>
          <Route path="/chat" element={<Protected><ChatNavbar/></Protected>}/>
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;

