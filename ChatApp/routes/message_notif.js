import express from "express";
import { getBadgeNotifs } from "../controllers/message_notif.js";

const router = express.Router();

router.get("/badgeNotifs/:fromUserId", getBadgeNotifs);

export default router;