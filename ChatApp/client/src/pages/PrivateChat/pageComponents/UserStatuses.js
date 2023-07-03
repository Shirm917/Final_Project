import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../contexts/AppContext";
import axios from "axios";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import CircleIcon from "@mui/icons-material/Circle";
import Badge from "@mui/material/Badge";
import { socket } from "../../../utils/socket";
import UserStatusIcon from "./UserStatusIcon";

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
    setBadgeNotifs,
    setMobileOpen,
    setText,
  } = useContext(AppContext);
  const [userStatuses, setUserStatuses] = useState([]);
  const [usersOnline, setUsersOnline] = useState([]);

  console.log("user statuses rendered");
  useEffect(() => {
    const getUserStatuses = async () => {
      try {
        const response = await axios.get(`/userStatuses/${fromUserId}`);
        setUserStatuses(response.data.userStatuses);
      } catch (err) {
        setUserMsg(err.response.data.msg);
      }
    };
    getUserStatuses();
  }, []);

  useEffect(() => {
    socket.on("user connected", (userId) => {
      setUsersOnline((prevUsers) => [...prevUsers, userId]);
    });
    return () => {
      socket.off("user connected");
    };
  }, [socket]);

  // useEffect(() => {
  //   socket.on("user disconnected", (userId) => {
  //     console.log("User disconnected:", userId);
  //     const usersOnlineFiltered = usersOnline.filter((element) => {
  //       return element !== userId;
  //     });
  //     setUsersOnline(usersOnlineFiltered);
  //   });

  //   return () => {
  //     socket.off("user disconnected");
  //   };
  // }, [socket]);

  useEffect(() => {
    const getBadgeNotifs = async () => {
      try {
        const response = await axios.get(`/badgeNotifs/${fromUserId}`);
        setBadgeNotifs(response.data.badgeNotifs);
      } catch (err) {}
    };
    getBadgeNotifs();
  }, []);

  const handleClick = (id) => {
    const emptyBadgeNotifs = badgeNotifs.filter((badgeNotif) => {
      return badgeNotif.from_id !== id;
    });
    setBadgeNotifs([...emptyBadgeNotifs]);
    setEmitMessages([]);
    setToUserId(id);
    setShowChat(true);
    setMobileOpen(false);
    setText("");
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
            console.log(user);
            const badgeNotifNum = badgeNotifs.filter((badgeNotif) => {
              return user.user_id === badgeNotif.from_id;
            });
            const userOnline = usersOnline.includes(user.user_id);
            return (
              <Box key={user.user_id}>
                <ListItem>
                  <ListItemButton onClick={() => handleClick(user.user_id)}>
                    <ListItemText>
                      {badgeNotifNum.length === 0 ? (
                        ""
                      ) : (
                        <Badge
                          badgeContent={badgeNotifNum.length}
                          color="success"
                        />
                      )}
                    </ListItemText>
                    <ListItemText primary={user.username} />
                    <UserStatusIcon userOnline={userOnline} onlineStatus={user.online_status} />
                  </ListItemButton>
                </ListItem>
                <Divider />
              </Box>
            );
          })
      )}
    </List>
  );
};

export default UserStatuses;
