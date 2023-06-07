import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../contexts/AppContext";
import axios from "axios";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import CircleIcon from "@mui/icons-material/Circle";
import Badge from "@mui/material/Badge";

const UserStatuses = () => {
  const {
    setEmitMessages,
    fromUserId,
    setToUserId,
    setShowChat,
    search,
    userMsg,
    setUserMsg,
  } = useContext(AppContext);
  const [userStatuses, setUserStatuses] = useState([]);
  const [messageNotifs, setMessageNotifs] = useState([]);

  const getUserStatuses = async () => {
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
    }, 1000);
  }, []);

  useEffect(() => {
    const getMessageNotifs = async () => {
      try {
        const response = await axios.get(`/messageNotifs/${fromUserId}`);
        setMessageNotifs(response.data.messageNotifs);
      } catch (err) {}
    };
    getMessageNotifs();
  }, []);

  useEffect(() => {
    return () => {
      clearInterval(getUserStatuses);
    };
  }, []);

  const handleClick = (id) => {
    const emptyMessageNotifs = messageNotifs.filter((messageNotif) => {
      return messageNotif.from_id !== id;
    });
    setMessageNotifs([...emptyMessageNotifs]);
    setEmitMessages([]);
    setToUserId(id);
    setShowChat(true);
  };

  return (
    <List className="userStatuses">
      {!userStatuses || userStatuses.length === 0 ? (
        <p>{userMsg}</p>
      ) : (
        userStatuses
          .filter((element) => {
            return element.username
              .toLowerCase()
              .startsWith(search.toLowerCase());
          })
          .map((user) => {
            const messageNotifNum = messageNotifs.filter((messageNotif) => {
              return user.user_id === messageNotif.from_id;
            });
            return (
              <>
                <ListItem key={user.user_id}>
                  <ListItemButton onClick={() => handleClick(user.user_id)}>
                    <ListItemText>
                      {messageNotifNum.length === 0 ? (
                        ""
                      ) : (
                        <Badge
                          badgeContent={messageNotifNum.length}
                          color="success"
                        ></Badge>
                      )}
                    </ListItemText>
                    <ListItemText primary={user.username} />
                    {!user.online_status ? (
                      <CircleIcon style={{ color: "transparent" }} />
                    ) : (
                      <CircleIcon style={{ color: "#b9f6ca" }} />
                    )}
                  </ListItemButton>
                </ListItem>
                <Divider />
              </>
            );
          })
      )}
    </List>
  );
};

export default UserStatuses;
