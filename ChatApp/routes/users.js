import express from "express";
import { register,login,logout} from "../controllers/users.js";

const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.put("/logout",logout);

export default router;