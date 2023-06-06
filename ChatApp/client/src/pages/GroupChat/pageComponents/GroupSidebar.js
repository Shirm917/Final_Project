import JoinRoom from "./JoinRoom";
import GroupLog from "./GroupLog";
import Notifications from "../../../components/Notifications";
import Divider from "@mui/material/Divider";
import ResponsiveDrawer from "../../../components/ResponsiveDrawer";
import "./GroupSidebar.css";

const GroupSidebar = () => {
  const drawer = (
    <>
      <JoinRoom />
      <Divider />
      <GroupLog />
      <Divider />
      <Notifications />
    </>
  );

  return <ResponsiveDrawer drawer={drawer} />;
};

export default GroupSidebar;
