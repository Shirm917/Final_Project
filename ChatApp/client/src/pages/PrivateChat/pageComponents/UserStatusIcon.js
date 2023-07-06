import CircleIcon from "@mui/icons-material/Circle";

const UserStatusIcon = (props) => {
  const { userOnline } = props;
  const className = userOnline ? "greenCircle" : "transparentCircle";
  return <CircleIcon className={className} />;
};

export default UserStatusIcon;
