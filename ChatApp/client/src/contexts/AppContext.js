import { useState, createContext, useRef } from "react";
import axios from "axios";
import { useBeforeunload } from "react-beforeunload";
import { socket } from "../utils/socket";

const AppContext = createContext(null);

const AppContextProvider = (props) => {
  const [userMsg, setUserMsg] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fromUserId, setFromUserId] = useState(null);
  const [toUserId, setToUserId] = useState(null);
  const [fromUsername, setFromUsername] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [text, setText] = useState("");
  const [roomName, setRoomName] = useState("");
  const [prevRoomName, setPrevRoomName] = useState("");
  const [emitMessages, setEmitMessages] = useState([]);
  const [groupEmitMessages, setGroupEmitMessages] = useState([]);
  const [roomMsgs, setRoomMsgs] = useState([]);
  const [messageNotifs, setMessageNotifs] = useState([]);
  const [badgeNotifs, setBadgeNotifs] = useState([]);
  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const messagesEnd = useRef(null);

  const disconnectSocket = () => {
    socket.emit("logout", fromUserId);
    socket.emit("leave room", roomName, fromUsername);
    socket.disconnect();
  };

  const clearValues = () => {
    setFromUserId(null);
    setToUserId(null);
    setShowChat(false);
    setRoomName("");
    setPrevRoomName("");
    setGroupEmitMessages([]);
    setRoomMsgs([]);
    setMessageNotifs([]);
    setIsLoggedIn(false);
  };

  const updateLogout = async () => {
    const dateNow = new Date();
    await axios.put("/logout", {
      timestamp: dateNow.toUTCString(),
      fromUserId,
    });
  };

  const reset = async () => {
    disconnectSocket();
    clearValues();
    await updateLogout();
  };

  const scroll = () => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  };

  useBeforeunload((event) => {
    if (fromUserId) {
      event.preventDefault();
      reset();
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
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
        text,
        setText,
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
        messageNotifs,
        setMessageNotifs,
        badgeNotifs,
        setBadgeNotifs,
        search,
        setSearch,
        reset,
        mobileOpen,
        setMobileOpen,
        messagesEnd,
        scroll,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
