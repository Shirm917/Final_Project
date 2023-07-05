import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import { configureSocket } from "./sockets/socket.js";
import users_router from "./routes/users.js";
import messages_router from "./routes/messages.js";
import userStatuses_router from "./routes/usersStatuses.js";
import message_notif_router from "./routes/message_notif.js";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(users_router);
app.use(messages_router);
app.use(userStatuses_router);
app.use(message_notif_router);

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "./client/build")));

configureSocket(io);

server.listen(process.env.PORT || 8080);

// app.get("*", (req,res) => {
//     res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
// })
