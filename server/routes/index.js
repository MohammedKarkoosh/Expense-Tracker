import express from "express";
import authRoutes from "./authRoutes.js";
import userRoutes from "./userRoutes.js";
// import transRoutes from "./transRoutes.js";
import accountRoutes from "./accountRoutes.js"


const router = express.Router();

router.use("/auth", authRoutes);
// router.use("/transaction", transRoutes);
router.use("/account", accountRoutes);
router.use("/user", userRoutes);




export default router;