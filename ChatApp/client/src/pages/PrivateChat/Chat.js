import { useEffect,useContext } from "react";
import {socket} from "../../utils/socket";
import { AppContext } from "../../contexts/AppContext";
import ChatSidebar from "./pageComponents/ChatSidebar";
import ChatBody from "./pageComponents/ChatBody";
import ChatInput from "./pageComponents/ChatInput";

const Chat = () => {
    const {isLoggedIn,fromUserId} = useContext(AppContext);

    useEffect(() => {
        if (isLoggedIn) {
            socket.auth = {fromUserId}
            socket.connect();
        }
      },[]);

    return (
        <section className="chat">
            <ChatSidebar/>
            <ChatBody/>
            <ChatInput/>
        </section>
    )
}

export default Chat;