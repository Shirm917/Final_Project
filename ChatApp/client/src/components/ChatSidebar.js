// Here is where we fetch the users and map them 
// we have on click here which gets the id of the user so we can do the to_id(get username here maybe)
// we will use app context and get the state here from app so we can use the from_id anywhere
import {useState,useEffect,useContext} from "react";
import { AppContext } from "../App";
import axios from "axios";
import "./ChatSidebar.css";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';


const ChatSidebar = () => {
    const {userMsg,setUserMsg,fromUserId,setToUserId} = useContext(AppContext);
    const [users,setUsers] = useState([]);

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(!show);

    useEffect(() => {
        const getUsers = async() => {
            try {
                console.log(fromUserId);
                const response = await axios.get(`http://localhost:3001/users/${fromUserId}`);
                setUsers(response.data.users);
            } catch (err) {
                setUserMsg(err.response.data.msg);
            }
        }
        getUsers();
    },[])

    return (
        <div>
      <Button variant="primary" onClick={handleShow}>
        Users
      </Button>

      <Offcanvas show={show}>
        <Offcanvas.Header>
          <Offcanvas.Title>Users</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            {
            !users || users.length === 0 ? <p>{userMsg}</p>
            :
            users.map(user => {
                return (
                    <div key={user.user_id}>
                        <p onClick={() => setToUserId(user.user_id)}>{user.username}</p>
                    </div>
                )
            })
            }
        </Offcanvas.Body>
      </Offcanvas>
    </div>
    )
}

export default ChatSidebar;
