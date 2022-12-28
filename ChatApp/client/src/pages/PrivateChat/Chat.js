import ChatSidebar from "./ChatSidebar";
import ChatBody from "./ChatBody";
import ChatInput from "./ChatInput";
import "./Chat.css";
// Chat component will hold all chat things, it will contain chatsidebar, chatbody, and chat input, 
// so in the props we send chat input the setText state so we can do the on change and on submit there
// in the props of chat body we send the messages array so we can map through them

const Chat = () => {
    return (
        <div className="chat">
            <ChatSidebar/>
            <ChatBody/>
            <ChatInput/>
        </div>
    )
}

export default Chat;