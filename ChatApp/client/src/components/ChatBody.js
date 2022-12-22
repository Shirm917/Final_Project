import { useContext } from "react"
import { AppContext } from "../App"

// contains the get from the db to get the messages
// in the use effect we get db messages and then emit messages are sent after 


const ChatBody = () => {
    const {emitMessages} = useContext(AppContext);
    console.log(emitMessages);
    return (
        <div>
            <ul className="messages">
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