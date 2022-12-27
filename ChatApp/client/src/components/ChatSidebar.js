// Here is where we fetch the users and map them 
// we have on click here which gets the id of the user so we can do the to_id(get username here maybe)
// we will use app context and get the state here from app so we can use the from_id anywhere
// fix this I don't want user msg in the body and maybe change this from an off canvas
// I just want this to be a sidebar that is collapasable and 
// it starts out and when it's out the chat shrinks to fit 
// and when it's collapsed the chat grows to fit

import {useState,useEffect,useContext} from "react";
import { AppContext } from "../App";
import axios from "axios";
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
// import CircleIcon from '@mui/icons-material/Circle';

const ChatSidebar = () => {
    const {userMsg,setUserMsg,isLoggedIn,fromUserId,setToUserId,setShowChat} = useContext(AppContext);
    const [users,setUsers] = useState([]);
    // const [color,setColor] = useState("");

    useEffect(() => {
        const getUsers = async() => {
            try {
                const response = await axios.get(`/users/${fromUserId}`);
                setUsers(response.data.users);
            } catch (err) {
                setUserMsg(err.response.data.msg);
            }
        }
        getUsers();
        // if(isLoggedIn) {
        //     setColor("green");
        // }
    },[])

    const handleClick = (id) => {
        setToUserId(id);
        setShowChat(true);
    };

  return (
    <Drawer anchor="left"  variant="permanent" sx={{
        width: 200,
        flexShrink: 0, 
        zIndex: 0, 
        [`& .MuiDrawer-paper`]: { width: 200, boxSizing: 'border-box', marginTop: 6 }
        }}>
        <List>
        {
            !users || users.length === 0 ? <p>{userMsg}</p>
            :
            users.map(user => {
                return (
                    <>
                        <ListItem key={user.user_id}>
                            <ListItemButton onClick={() => handleClick(user.user_id)}>
                                <ListItemText primary={user.username} />
                            </ListItemButton>
                            {/* <CircleIcon style={{color: color}}/> */}
                        </ListItem>
                        <Divider/>
                    </>
                )
            })
        }
        </List>
    </Drawer>
  );
}

export default ChatSidebar;
