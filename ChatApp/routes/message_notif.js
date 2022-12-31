import express from "express";
import { getNotifs,fixNotifs } from "../controllers/message_notif.js";

const router = express.Router();

router.get("/notifs/:fromUserId", getNotifs);
router.put("/fixNotifs", fixNotifs);

export default router;