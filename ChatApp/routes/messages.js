// here is the post in order to insert the messages

import express from "express";
import { insertMessage } from "../controllers/messages.js";

const router = express.Router();

router.post("/messages", insertMessage);

export default router;