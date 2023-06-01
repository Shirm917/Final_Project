import { useState } from "react";
import Chat from "../pages/PrivateChat/Chat";
import GroupChat from "../pages/GroupChat/GroupChat";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import "./Navbar.css";

const ChatNavbar = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

  return (
    <Box className="chatContainer">
      <Box className="chatTitles">
        <Tabs value={tabIndex} onChange={handleTabChange} centered>
          <Tab label="Private Chat" />
          <Tab label="Group Chat" />
        </Tabs>
      </Box>

      <Box className="chats" sx={{ padding: 2 }}>
        {tabIndex === 0 && <Chat />}
        {tabIndex === 1 && <GroupChat />}
      </Box>
    </Box>
  );
};

export default ChatNavbar;
