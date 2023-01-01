import Search from "./Search";
import UserStatuses from "./UserStatuses";
import Notifications from "../../components/Notifications";
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import "./ChatSidebar.css";


const ChatSidebar = () => {
  return (
    <Drawer anchor="left"  variant="permanent" sx={{
        width: 200,
        flexShrink: 0, 
        zIndex: 0, 
        [`& .MuiDrawer-paper`]: { width: 200, boxSizing: 'border-box', marginTop: 7.6,marginRight: 20 }
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
