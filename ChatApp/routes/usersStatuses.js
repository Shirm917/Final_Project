import express from "express";
import { getUserStatuses,userStatus } from "../controllers/usersStatuses.js";

const router = express.Router();

router.get("/userStatuses/:fromUserId", getUserStatuses);
router.post("/userStatus",userStatus);

export default router;