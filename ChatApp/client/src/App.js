import { useState,createContext } from "react";
import {Routes,Route} from "react-router-dom";
import ChatNavbar from "./components/ChatNavbar";
import Navbar from "./components/Navbar";
import LoginRegister from "./components/LoginRegister";
import './App.css';

export const AppContext = createContext(null);

// don't have link for chat in navbar when we successfully log in we want to be directed to chat component, so /chat,
// chat component will hold all chat things

function App() {
  const [userMsg, setUserMsg] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fromUserId,setFromUserId] = useState(null);
  const [toUserId,setToUserId] = useState(null);
  const [dbMessages, setDbMessages] = useState([]);
  const [emitMessages, setEmitMessages] = useState([]);
  const [showChat,setShowChat] = useState(false);
  const [roomName, setRoomName] = useState("");

  return (
    <AppContext.Provider 
      value={
        {
          userMsg,
          setUserMsg,
          isLoggedIn,
          setIsLoggedIn,
          fromUserId,
          setFromUserId,
          toUserId,
          setToUserId,
          dbMessages,
          setDbMessages,
          emitMessages,
          setEmitMessages,
          showChat,
          setShowChat,
          roomName,
          setRoomName
        }
      }
    >
      <div>
        <Navbar/>
        <Routes>
          <Route path="/register" element={<LoginRegister title="Register"/>}/>
          <Route path="/login" element={<LoginRegister title="Login"/>}/>
          <Route path="/chat" element={<ChatNavbar/>}/>
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;

