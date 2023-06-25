export const configureSocket = (io) => {
    io.on("connection", (socket) => {

        // ------ Private Messaging ------ //
        socket.fromUserId = socket.handshake.auth.fromUserId;
        socket.join(socket.fromUserId);

        socket.on("chat message", (toUserId,msg,fromUsername) => {
            io.to(socket.fromUserId).to(toUserId).emit("msgResponse", socket.fromUserId,msg);
            io.to(toUserId).emit("notif", `You got a message from ${fromUsername}`);
        })

        // ------ Group Messaging ------ //
        socket.on("join room", (prevRoomName,roomName,fromUsername) => {
           if (prevRoomName && prevRoomName !== "") {
            socket.leave(prevRoomName);
            socket.to(prevRoomName).emit("roomMsg", `${fromUsername} has left`);
           };
            socket.join(roomName);
            socket.to(roomName).emit("roomMsg", `${fromUsername} has joined`);
        });

        socket.on("leave room", (currentPrevRoomName,fromUsername) => {
            socket.leave(currentPrevRoomName);
            socket.to(currentPrevRoomName).emit("roomMsg", `${fromUsername} has left`);
        })

        socket.on("group message", (msg,roomName,fromUserId,fromUsername) => {
            io.to(roomName).emit("group msgResponse", msg,fromUserId,fromUsername);
        });

        // on login and logout
        // socket.on("leave room", (roomName,fromUsername) => {
        //     socket.leave(roomName);
        //     socket.to(roomName).emit("roomMsg", `${fromUsername} has left`);
        // });
    });
};