import PrivateSidebar from "./pageComponents/PrivateSidebar";
import PrivateBody from "./pageComponents/PrivateBody";
import PrivateInput from "./pageComponents/PrivateInput";

const PrivateChat = () => {
  return (
    <section className="chat">
      <PrivateSidebar />
      <PrivateBody />
      <PrivateInput />
    </section>
  );
};

export default PrivateChat;
