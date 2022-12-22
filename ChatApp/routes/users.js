// here I do the whole router.get("/users", here is the function that I created in controllers) 
// I import it from controllers ex: router.get("/users",getUsers)

import express from "express";
import { register,login,getUsers } from "../controllers/users.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/users/:from_id", getUsers);

export default router;