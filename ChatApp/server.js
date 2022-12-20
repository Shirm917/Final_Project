import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http from "http";
import { Server } from "socket.io";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors({
    origin: "http://localhost:3000"
}));

io.on("connection", (socket) => {
    console.log("a user connected");
    console.log(`id: ${socket.id}`);
    socket.on("disconnect", () => {
        console.log("a user disconnected");
    })
    socket.on("chat message", (msg) => {
        console.log(msg);
        socket.broadcast.emit("msgResponse", msg);
    })
});

server.listen(process.env.PORT || 8080, () => {
    console.log(`Listening on port ${process.env.PORT || 8080}`);
});