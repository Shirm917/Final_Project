import CircleIcon from "@mui/icons-material/Circle";

const UserStatusIcon = (props) => {
  const { userOnline,onlineStatus } = props;
  const className = (userOnline || onlineStatus) ? "greenCircle" : "transparentCircle";
  return <CircleIcon className={className} />;
};

export default UserStatusIcon;