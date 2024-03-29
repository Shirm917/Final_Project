export const configureSocket = (io) => {
  io.on("connection", (socket) => {
    const fromUserId = socket.handshake.auth.fromUserId;
    socket.join(fromUserId);

    // ------ User Connecting ------ //

    socket.on("socket connected", () => {
      socket.broadcast.emit("user connected", fromUserId);
    });

    // ------ Private Messaging ------ //

    socket.on("private message", (toUserId, msg, fromUsername, messageUuid) => {
      io.to(fromUserId)
        .to(toUserId)
        .emit("msgResponse", fromUserId, msg, messageUuid);
      io.to(toUserId).emit("notif", `You got a message from ${fromUsername}`);
    });

    // ------ Group Messaging ------ //
    socket.on("join room", (prevRoomName, roomName, fromUsername) => {
      if (prevRoomName && prevRoomName !== "") {
        socket.leave(prevRoomName);
        socket.to(prevRoomName).emit("roomMsg", `${fromUsername} has left`);
      }
      socket.join(roomName);
      socket.to(roomName).emit("roomMsg", `${fromUsername} has joined`);
    });

    socket.on("leave room", (currentPrevRoomName, fromUsername) => {
      socket.leave(currentPrevRoomName);
      socket
        .to(currentPrevRoomName)
        .emit("roomMsg", `${fromUsername} has left`);
    });

    socket.on("group message", (msg, roomName, fromUsername) => {
      io.to(roomName).emit("group msgResponse", msg, fromUserId, fromUsername);
    });

    // ------ User Disconnecting ------ //

    socket.on("logout", () => {
      socket.leave(fromUserId);
      socket.broadcast.emit("user disconnected", fromUserId);
    });

    // on login and logout
    // socket.on("leave room", (roomName,fromUsername) => {
    //     socket.leave(roomName);
    //     socket.to(roomName).emit("roomMsg", `${fromUsername} has left`);
    // });
  });
};
