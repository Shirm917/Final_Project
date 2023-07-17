import { useContext } from "react";
import { socket } from "../../../utils/socket";
import { AppContext } from "../../../contexts/AppContext";
import TextField from "@mui/material/TextField";

const JoinLeaveRoom = () => {
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

  const joinRoom = (event) => {
    event.preventDefault();
    if (prevRoomName === roomName || !roomName) return;
    if (roomName) {
      clear(event);
      socket.emit("join room", prevRoomName, roomName, fromUsername);
      setPrevRoomName(roomName);
      event.target.reset();
    }
  };

  const leaveRoom = (event) => {
    event.preventDefault();
    const currentPrevRoomName = prevRoomName;
    if (roomName) {
      clear();
      socket.emit("leave room", currentPrevRoomName, fromUsername);
      setPrevRoomName("");
      setRoomName("");
    }
  };

  const clear = () => {
    setGroupEmitMessages([]);
    setRoomMsgs([]);
  };

  return (
    <form id="groupRoomForm" onSubmit={joinRoom}>
      <TextField
        id="filled-error-helper-text"
        label="Room Name"
        value={roomName}
        variant="filled"
        helperText="Room Name can't start with a number."
        size="medium"
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <>
              <button className="btn groupBtn" type="submit">
                Join
              </button>
              <button className="btn groupBtn" onClick={leaveRoom}>
                Leave
              </button>
            </>
          ),
        }}
      />
    </form>
  );
};

export default JoinLeaveRoom;
