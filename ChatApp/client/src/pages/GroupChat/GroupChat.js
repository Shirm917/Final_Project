import GroupSidebar from "./GroupSidebar";
import GroupBody from "./GroupBody";
import GroupInput from "./GroupInput";

const GroupChat = () => {
    return (
        <div className="chat">
            <GroupSidebar/>
            <GroupBody/>
            <GroupInput/>
       </div>
    )
};

export default GroupChat;