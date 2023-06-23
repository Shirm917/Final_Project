import { useEffect,useContext } from "react";
import {socket} from "../../utils/socket";
import { AppContext } from "../../contexts/AppContext";
import PrivateSidebar from "./pageComponents/PrivateSidebar";
import PrivateBody from "./pageComponents/PrivateBody";
import PrivateInput from "./pageComponents/PrivateInput";

const PrivateChat = () => {
    const {isLoggedIn,fromUserId} = useContext(AppContext);

    useEffect(() => {
        if (isLoggedIn) {
            socket.auth = {fromUserId}
            socket.connect();
        }
      },[]);

    return (
        <section className="chat">
            <PrivateSidebar/>
            <PrivateBody/>
            <PrivateInput/>
        </section>
    )
}

export default PrivateChat;