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
    badgeNotifs,
    setBadgeNotifs
  } = useContext(AppContext);
  const [userStatuses, setUserStatuses] = useState([]);

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
    const getBadgeNotifs = async () => {
      try {
        const response = await axios.get(`/badgeNotifs/${fromUserId}`);
        setBadgeNotifs(response.data.badgeNotifs);
      } catch (err) {}
    };
    getBadgeNotifs();
  }, []);

  useEffect(() => {
    return () => {
      clearInterval(getUserStatuses);
    };
  }, []);

  const handleClick = (id) => {
    const emptyBadgeNotifs = badgeNotifs.filter((badgeNotif) => {
      return badgeNotif.from_id !== id;
    });
    setBadgeNotifs([...emptyBadgeNotifs]);
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
            const badgeNotifNum = badgeNotifs.filter((badgeNotif) => {
              return user.user_id === badgeNotif.from_id;
            });
            return (
              <>
                <ListItem key={user.user_id}>
                  <ListItemButton onClick={() => handleClick(user.user_id)}>
                    <ListItemText>
                      {badgeNotifNum.length === 0 ? (
                        ""
                      ) : (
                        <Badge
                          badgeContent={badgeNotifNum.length}
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
