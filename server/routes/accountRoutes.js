import express from "express";
import authMiddleWare from "../middleware/authMiddleWare.js";
import {getAccount, createAccount, addMoneyToAccount} from "../controllers/accountCon.js"

const router = express.Router();


router.get("/:id", authMiddleWare, getAccount);
router.post("/create-account", authMiddleWare, createAccount);
router.put("/add-money/:id", authMiddleWare, addMoneyToAccount);

export default router;