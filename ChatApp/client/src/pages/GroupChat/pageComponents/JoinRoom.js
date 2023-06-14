import { useContext } from "react";
import { socket } from "../../../utils/socket";
import { AppContext } from "../../../contexts/AppContext";
import TextField from "@mui/material/TextField";

const JoinRoom = () => {
  const {
    setGroupEmitMessages,
    roomName,
    setRoomName,
    setRoomMsgs,
    prevRoomName,
    setPrevRoomName,
    fromUsername,
  } = useContext(AppContext);

  const handleChange = (event) => {
    const regex = /^[A-Za-z]*[A-Za-z][A-Za-z0-9-. _]*$/;
    if (event.target.value === "" || regex.test(event.target.value)) {
      setRoomName(event.target.value.toUpperCase());
    }
  };

  const submitRoomName = (event) => {
    event.preventDefault();
    if ((prevRoomName === roomName) || !roomName) return;
    clear(event);
    if (roomName) {
      socket.emit("room name", prevRoomName, roomName, fromUsername);
    }
    setPrevRoomName(roomName);
  };

  const clear = (event) => {
    event.currentTarget.reset();
    setGroupEmitMessages([]);
    setRoomMsgs([]);
  };

  return (
    <form id="joinForm" onSubmit={submitRoomName}>
      <TextField
        id="filled-error-helper-text"
        label="Room Name"
        variant="filled"
        helperText="Room Name can't start with a number."
        size="small"
        onChange={handleChange}
        InputProps={{ endAdornment: <button className="btn">Join</button> }}
      />
    </form>
  );
};

export default JoinRoom;
