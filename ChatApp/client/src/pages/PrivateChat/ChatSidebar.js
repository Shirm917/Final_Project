// Here is where we fetch the users and map them 
// we have on click here which gets the id of the user so we can do the to_id(get username here maybe)
// we will use app context and get the state here from app so we can use the from_id anywhere
// fix this I don't want user msg in the body and maybe change this from an off canvas
// I just want this to be a sidebar that is collapasable and 
// it starts out and when it's out the chat shrinks to fit 
// and when it's collapsed the chat grows to fit
import Search from "./Search";
import UserStatuses from "./UserStatuses";
import Notifications from "../../components/Notifications";
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Box from "@mui/system/Box";
import "./ChatSidebar.css";

// do filter and map to join arrays together, then comment it out and do the inner join

const ChatSidebar = () => {
  return (
    <Drawer anchor="left"  variant="permanent" sx={{
        width: 200,
        flexShrink: 0, 
        zIndex: 0, 
        [`& .MuiDrawer-paper`]: { width: 200, boxSizing: 'border-box', marginTop: 7.6 }
        }}>
        <Search/>
        <UserStatuses/>
        <Divider/>
        <Notifications/>
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
