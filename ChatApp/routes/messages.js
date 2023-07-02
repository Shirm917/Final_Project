import express from "express";
import { insertMessage, getMessages } from "../controllers/messages.js";

const router = express.Router();

router.post("/messages", insertMessage);
router.get("/messages/:from_id/:to_id", getMessages);

export default router;
