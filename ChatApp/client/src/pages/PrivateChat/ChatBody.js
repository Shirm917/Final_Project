import { useState,useEffect,useContext,useRef } from "react"
import { AppContext } from "../../App"
import { socket } from "../../utils/socket";
import axios from "axios";


// contains the get from the db to get the messages
// in the use effect we get db messages and then emit messages are sent after 
// Use css here with the ids we can use an if statement so if the userid is the from id give it this classname else give it another classname


const ChatBody = () => {
    const {emitMessages,setEmitMessages,fromUserId,toUserId,showChat,messagesEnd,scroll} = useContext(AppContext);
    const [dbMessages,setDbMessages] = useState([]);

    useEffect(() => {
        const getMessages = async() => {
            try {
                const response = await axios.get(`/messages/${fromUserId}/${toUserId}`);
                setDbMessages(response.data.messages);
            } catch (err) {
                console.log(err);
            }
        }

        getMessages();
    },[toUserId]);

    useEffect(() => {
        socket.on("msgResponse", (fromId,message) => {
          setEmitMessages([...emitMessages, {fromId,message}]);
        });
        
        return () => {
          socket.off("msgResponse");
        };
      },[socket,emitMessages]);
    
    useEffect(() => {
        scroll();
    },[dbMessages,emitMessages])
    
    return (
        !showChat ? ""
        :
        <div className="messages">
            <ul>
                {
                    !dbMessages || dbMessages.length === 0 ? null 
                    :
                    dbMessages.map(element => {
                        const value = element.from_id === fromUserId ? "fromId" : "toId";
                        return (
                            <li key={element.messages_id} className={value}>{element.message}</li>
                        )
                    })
                }
                {
                    emitMessages.map((element,index) => {
                        const value = element.fromId === fromUserId ? "fromId" : "toId";
                        return (
                            element.fromId !== toUserId ? null :
                            <li key={index} className={value}>{element.message}</li>
                        )
                    })
                }
            </ul>
            <div ref={messagesEnd}/>
        </div>
    )
}

export default ChatBody;