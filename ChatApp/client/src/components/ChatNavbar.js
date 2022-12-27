import {useState} from "react";
import Chat from "./Chat";
import GroupChat from "./GroupChat";
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const ChatNavbar = () => {
    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (event, newTabIndex) => {
        setTabIndex(newTabIndex);
    };

    return (
        <Box>
            <Box>
                <Tabs value={tabIndex} onChange={handleTabChange} className="tabs" centered>
                    <Tab label="Private Chat" />
                    <Tab label="Group Chat" />
                </Tabs>
            </Box>

            <Box sx={{ padding: 2 }}>
                {tabIndex === 0 && (
                    <Box>
                        <Chat/>
                    </Box>
                )}
                {tabIndex === 1 && (
                    <Box>
                        <GroupChat/>
                    </Box>
                )}
            </Box>
        </Box>
    )
};

export default ChatNavbar;