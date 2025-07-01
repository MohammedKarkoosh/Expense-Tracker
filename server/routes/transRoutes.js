import express from "express";
import authMiddleWare from "../middleware/authMiddleWare.js";
import {getTransc, addTransc,transferMoneyToAccount,getDashInfo} from "../controllers/transcCon.js"

const router= express.Router();


router.get("/", authMiddleWare, getTransc);
router.post("/add-transc/:account_id",authMiddleWare, addTransc);
router.put("/transfer-money", authMiddleWare, transferMoneyToAccount);
router.get("/dash", authMiddleWare, getDashInfo);


export default router;