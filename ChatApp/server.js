import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import users_router from "./routes/users.js";
import messages_router from "./routes/messages.js";
import userStatuses_router from "./routes/usersStatuses.js";
import message_notif_router from "./routes/message_notif.js";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(users_router);
app.use(messages_router);
app.use(userStatuses_router);
app.use(message_notif_router);

io.on("connection", (socket) => {

    // ------ Private Messaging ------ //
    socket.fromUserId = socket.handshake.auth.fromUserId;
    socket.join(socket.fromUserId);
    
    socket.on("chat message", (toUserId,msg,fromUsername) => {
        io.to(socket.fromUserId).to(toUserId).emit("msgResponse", socket.fromUserId,msg);
        io.to(toUserId).emit("notif", `You got a message from ${fromUsername}`);
    })

    // ------ Group Messaging ------ //
    socket.on("room name", (prevRoomName,roomName,fromUsername) => {
        socket.leave(prevRoomName);
        socket.to(prevRoomName).emit("roomMsg", `${fromUsername} has left`);

        socket.join(roomName);
        socket.to(roomName).emit("roomMsg", `${fromUsername} has joined`);
    })

    socket.on("group message", (msg,roomName,fromUserId,fromUsername) => {
        io.to(roomName).emit("group msgResponse", msg,fromUserId,fromUsername);
    });

    // on login and logout
    socket.on("leave room", (roomName,fromUsername) => {
        socket.leave(roomName);
        socket.to(roomName).emit("roomMsg", `${fromUsername} has left`);
    })
});

server.listen(process.env.PORT || 8080, () => {
    console.log(`Listening on port ${process.env.PORT || 8080}`);
});

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", (req,res) => {
    res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
})