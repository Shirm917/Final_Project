import {useEffect,useContext} from "react";
import { socket } from "../../utils/socket";
import { AppContext } from "../../App";

const GroupBody = () => {
    const {groupEmitMessages,setGroupEmitMessages,fromUserId,messagesEnd,scroll} = useContext(AppContext);

    useEffect(() => {
        socket.on("group msgResponse", (message,fromId) => {
            setGroupEmitMessages([...groupEmitMessages, {message,fromId}]);
        });

        return () => {
            socket.off("group msgResponse");
        };
    },[socket,groupEmitMessages]);

    useEffect(() => {
        scroll();
    },[groupEmitMessages]);

    return (
        <div className="bodyContainer">
            <ul className="messagesContainer">
                {
                    !groupEmitMessages || groupEmitMessages.length === 0 ? null
                    :
                    groupEmitMessages.map((element,index) => {
                        const value = fromUserId === element.fromId ? "fromId" : "toId";
                        return (
                            <li key={index} className={value}>{element.message}</li>
                        )
                    })
                }
            </ul>
            <div ref={messagesEnd}/>
        </div>
    );
};

export default GroupBody;