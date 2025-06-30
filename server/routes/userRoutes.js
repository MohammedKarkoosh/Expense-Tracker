import express from "express";
import authMiddleWare from "../middleware/authMiddleWare.js";
import { changePassword,getUser,updateUser } from "../controllers/userCon.js";


const router = express.Router();

router.get("/", authMiddleWare, getUser);
router.put("/password-change", authMiddleWare, changePassword);
router.put("/:id", authMiddleWare, updateUser);
// router.delete("/:id", authMiddleWare, deleteUser);



export default router;