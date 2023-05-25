import { useEffect,useContext } from "react";
import {socket} from "../../utils/socket";
import { AppContext } from "../../App";
import ChatSidebar from "./ChatSidebar";
import ChatBody from "./ChatBody";
import ChatInput from "./ChatInput";

const Chat = () => {
    const {isLoggedIn,fromUserId} = useContext(AppContext);

    useEffect(() => {
        if (isLoggedIn) {
            socket.auth = {fromUserId}
            socket.connect();
        }
      },[]);

    return (
        <div className="chat">
            <ChatSidebar/>
            <ChatBody/>
            <ChatInput/>
        </div>
    )
}

export default Chat;