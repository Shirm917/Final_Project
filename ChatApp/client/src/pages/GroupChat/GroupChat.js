import GroupSidebar from "./pageComponents/GroupSidebar"
import GroupBody from "./pageComponents/GroupBody";
import GroupInput from "./pageComponents/GroupInput";

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