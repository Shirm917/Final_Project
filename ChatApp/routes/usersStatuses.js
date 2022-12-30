import express from "express";
import { getUserStatuses } from "../controllers/usersStatuses.js";

const router = express.Router();

router.get("/userStatuses/:fromUserId", getUserStatuses);

export default router;