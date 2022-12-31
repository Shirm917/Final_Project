import {useState,useEffect,useContext} from "react";
import { AppContext } from "../../App";
import axios from "axios";
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import CircleIcon from '@mui/icons-material/Circle';

const UserStatuses = () => {
    const {setEmitMessages,fromUserId,setToUserId,setShowChat,search,userMsg,setUserMsg,fixNotifications} = useContext(AppContext);
    const [userStatuses,setUserStatuses] = useState([]);
    const [notifs,setNotifs] = useState([]);

    
    const getUserStatuses = async() => {
        try {
            const response = await axios.get(`/userStatuses/${fromUserId}`);
            setUserStatuses(response.data.userStatuses);
        } catch (err) {
            setUserMsg(err.response.data.msg);
        }
    };

    useEffect(() => {
        getUserStatuses();
        setInterval(() => {
            getUserStatuses();
        },1000);
    },[])


    useEffect(() => {
        const getNotifs = async() => {
            try {
                const response = await axios.get(`/notifs/${fromUserId}`);
                setNotifs(response.data.notifs);
                fixNotifications();
                setInterval(() => {
                    fixNotifications();
                },5000);
            } catch (err) {
                console.log(err);
            }
        };
        getNotifs();
    },[])

    useEffect(() => {
        return () => {
            clearInterval(fixNotifications);
            clearInterval(getUserStatuses);
        }
    },[]);

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
        <List className="userStatuses">
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
    )
};

export default UserStatuses;