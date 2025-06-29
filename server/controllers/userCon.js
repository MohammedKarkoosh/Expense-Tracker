import { compare } from "bcrypt";
import { pool } from "../libs/db.js";
import { hashPassword } from "../libs";

export const getUser = async (req, res) => {
  try {
    const { userId } = req.body.user;

    const isUser = await pool.query({
      text: "SELECT * FROM tbluser WHERE id = $1",
      values: [userId],
    });

    const user = isUser.rows[0];

    if (!user) {
      return res.status(401).json({
        status: "Failed",
        message: "No User Found",
      });
    }
    user.password = undefined;
    res.status(201).json({
      status: "Success",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "Failed",
      message: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "Failed",
      message: error.message,
    });
  }
};

export const changePassword = async (req, res) => {
  try {

    const {userId} = req.body.user;
    const {currPassword, newPassword, confirmPassword} = req.body;

     const isUser = await pool.query({
      text: "SELECT * FROM tbluser WHERE id = $1",
      values: [userId],
    });

    const user = isUser.rows[0];

    if (!user) {
      return res.status(401).json({
        status: "Failed",
        message: "No User Found",
      });
    }

    if (newPassword !== newPassword){

         return res.status(401).json({
        status: "Failed",
        message: "New Password must match",
      });
    }
    const isMatch = await passwordCompare(currPassword, user?.password);
    if (!isMatch){

         return res.status(401).json({
        status: "Failed",
        message: "Invalid Password",
      });
    }

    const passwordHashed = await hashPassword(password);
    await pool.query({
        text: "UPDATE tbluser SET password = $1 WHERE id = $2",
        values: [passwordHashed, userId]
    });
        res.status(201).json({
      status: "Success",
      message: "Password has been changed",
    });


  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "Failed",
      message: error.message,
    });
  }
};
