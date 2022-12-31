import {useState,useEffect,useContext} from "react";
import JoinRoom from "./JoinRoom";
import GroupLog from "./GroupLog";
import Notifications from "../../components/Notifications";
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Box from "@mui/system/Box";
import "./GroupSidebar.css";

const GroupSidebar = () => {
    return (
        <Drawer anchor="left"  variant="permanent" sx={{
            width: 200,
            flexShrink: 0, 
            zIndex: 0, 
            [`& .MuiDrawer-paper`]: { width: 200, boxSizing: 'border-box', marginTop: 8 }
            }}>
            <JoinRoom/>
            <Divider/>
            <GroupLog/>
            <Divider/>
            <Notifications/>
        </Drawer>
    )
}

export default GroupSidebar;