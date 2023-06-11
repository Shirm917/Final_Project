import Search from "./Search";
import UserStatuses from "./UserStatuses";
import Notifications from "../../../components/Notifications";
import Divider from "@mui/material/Divider";
import ResponsiveDrawer from "../../../components/ResponsiveDrawer";

const ChatSidebar = () => {
  const drawer = (
    <>
      <Search />
      <UserStatuses />
      <Divider />
      <Notifications />
    </>
  );

  return (
    <ResponsiveDrawer drawer={drawer}/>
  );
};

export default ChatSidebar;
