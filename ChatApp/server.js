import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import users_router from "./routes/users.js";
import messages_router from "./routes/messages.js";
// send all the online usernames or ids here and so we can do the green thing
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors({
    origin: "http://localhost:3000"
}));

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(users_router);
app.use(messages_router);


// middleware like if fromuserid was actually sent/exists then go next()
io.on("connection", (socket) => {
    console.log("a user connected");
    console.log(`id: ${socket.id}`);
    socket.on("disconnect", () => {
        console.log("a user disconnected");
    })

    // ------ Private Messaging ------ //
    socket.fromUserId = socket.handshake.auth.fromUserId;
    socket.join(socket.fromUserId);

    socket.on("chat message", (msg,toUserId) => {
        io.to(socket.fromUserId).to(toUserId).emit("msgResponse", msg);
    })

    // ------ Group Messaging ------ //
    socket.on("room name", (roomName) => {
        socket.join(roomName);
    })

});

server.listen(process.env.PORT || 8080, () => {
    console.log(`Listening on port ${process.env.PORT || 8080}`);
});