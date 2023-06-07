import express from "express";
import { getNotifs } from "../controllers/message_notif.js";

const router = express.Router();

router.get("/messageNotifs/:fromUserId", getNotifs);

export default router;