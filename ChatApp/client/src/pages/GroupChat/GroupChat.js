import JoinRoom from "./JoinRoom";
import GroupLog from "./GroupLog";
import GroupBody from "./GroupBody";
import GroupInput from "./GroupInput";

// make something here when drawer disspaears so it looks good, like the joining room name input and tempory stuff here, maybe a button to bo 
// change css 
const GroupChat = () => {
    return (
        <div className="chat">
            <JoinRoom/>
            <GroupLog/>
            <GroupBody/>
            <GroupInput/>
       </div>
    )
};

export default GroupChat;