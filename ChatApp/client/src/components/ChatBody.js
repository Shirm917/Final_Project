import { useEffect,useContext } from "react"
import { AppContext } from "../App"
import axios from "axios";

// contains the get from the db to get the messages
// in the use effect we get db messages and then emit messages are sent after 
// Use css here with the ids we can use an if statement so if the userid is the from id give it this classname else give it another classname


const ChatBody = () => {
    const {emitMessages,dbMessages,setDbMessages,fromUserId,toUserId,showChat} = useContext(AppContext);

    useEffect(() => {
        const getMessages = async() => {
            try {
                const response = await axios.get(`/messages/${fromUserId}/${toUserId}`);
                setDbMessages(response.data.messages)
            } catch (err) {
                console.log(err);
            }
        }

        getMessages();
    },[toUserId]);
    

    return (
        !showChat ? ""
        :
        <div>
            <ul className="messages">
                {
                    !dbMessages || dbMessages.length === 0 ? null 
                    :
                    dbMessages.map(message => {
                        return (
                            <li>{message.message}</li>
                        )
                    })
                }
                {
                    emitMessages.map(message => {
                        return (
                            <li>{message}</li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default ChatBody;