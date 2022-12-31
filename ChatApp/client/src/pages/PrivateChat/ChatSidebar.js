// Here is where we fetch the users and map them 
// we have on click here which gets the id of the user so we can do the to_id(get username here maybe)
// we will use app context and get the state here from app so we can use the from_id anywhere
// fix this I don't want user msg in the body and maybe change this from an off canvas
// I just want this to be a sidebar that is collapasable and 
// it starts out and when it's out the chat shrinks to fit 
// and when it's collapsed the chat grows to fit

import {useState,useEffect,useContext} from "react";
import { AppContext } from "../../App";
import axios from "axios";
import Search from "./Search";
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import CircleIcon from '@mui/icons-material/Circle';

// do filter and map to join arrays together, then comment it out and do the inner join

const ChatSidebar = () => {
    const {setEmitMessages,userMsg,setUserMsg,fromUserId,setToUserId,setShowChat,search} = useContext(AppContext);
    const [userStatuses,setUserStatuses] = useState([]);
    const [notifs,setNotifs] = useState([]);
    
    useEffect(() => {
        const getUserStatuses = async() => {
            try {
                const response = await axios.get(`/userStatuses/${fromUserId}`);
                setUserStatuses(response.data.userStatuses);
            } catch (err) {
                setUserMsg(err.response.data.msg);
            }
        };
        getUserStatuses();
    },[])

    useEffect(() => {
        const getNotifs = async() => {
            try {
                const response = await axios.get(`/notifs/${fromUserId}`);
                setNotifs(response.data.notifs);
            } catch (err) {
                console.log(err);
            }
        };
        getNotifs();
    },[])

    const handleClick = (id) => {
        const emptyNotifs = notifs.filter(notif => {
            return notif.from_id !== id;
        })
        setNotifs([...emptyNotifs]);
        setEmitMessages([]);
        setToUserId(id);
        setShowChat(true);
    };

  return (
    <Drawer anchor="left"  variant="permanent" sx={{
        width: 200,
        flexShrink: 0, 
        zIndex: 0, 
        [`& .MuiDrawer-paper`]: { width: 200, boxSizing: 'border-box', marginTop: 7.6 }
        }}>
        <Search/>
        <List>
        {
            !userStatuses || userStatuses.length === 0 ? <p>{userMsg}</p>
            :
            userStatuses.filter(element => {
                return element.username.startsWith(search);
            })
            .map(user => {
                const notifNum = notifs.filter(notif => {
                    return user.user_id === notif.from_id;
                })
                return (
                    <>
                        <ListItem key={user.user_id}>
                            <ListItemButton onClick={() => handleClick(user.user_id)}>
                            <ListItemText>{notifNum.length === 0 ? null : notifNum.length}</ListItemText>
                                <ListItemText primary={user.username} />
                                {
                                !user.online_status ? null 
                                :
                                <CircleIcon style={{color: "#b9f6ca"}}/>
                                }
                            </ListItemButton>
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



// What I did before I innerjoined users and statuses on the backend since at first I only had a users array and only did statuses later on, 
// const combination = () => {
//     const usersAndStatuses = users.map(user => {
//         return {...user, 
//             online_status: statuses.filter(status => {
//                 return status.user_id === user.user_id;
//             })
//         }
// })
// console.log(usersAndStatuses);
// You would map through this and do usersAndStatuses.username, usersAndStatuses.userId and usersAndStatuses.online_status[0].online_status
// }
