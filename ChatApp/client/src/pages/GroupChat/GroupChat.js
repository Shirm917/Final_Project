import GroupSidebar from "./pageComponents/GroupSidebar";
import GroupBody from "./pageComponents/GroupBody";
import GroupInput from "./pageComponents/GroupInput";

const GroupChat = () => {
  return (
    <section className="chat">
      <GroupSidebar />
      <GroupBody />
      <GroupInput />
    </section>
  );
};

export default GroupChat;
