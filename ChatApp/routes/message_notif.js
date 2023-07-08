import express from "express";
import {
  getBadgeNotifs,
  updateNotifications,
} from "../controllers/message_notif.js";

const router = express.Router();

router.get("/badgeNotifs/:fromUserId", getBadgeNotifs);
router.put("/updateNotifications", updateNotifications);

export default router;
