import { pool } from "../libs/db.js";
import { hashPassword, passwordCompare } from "../libs.js";

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
    res.status(200).json({
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
    const {userId} = req.body.user;
    const {firstName, lastName, country, currency, contact} = req.body;

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

    const userUpdated = await pool.query({

        text:"UPDATE tbluser SET firstname = $1, lastname = $2, country=$3, currency=$4, contact=$5, updatedAt=CURRENT_TIMESTAMP WHERE id = $6 RETURNING *",
        values: [firstName, lastName, country, currency, contact, userId],
    });
    userUpdated.rows[0].password = undefined;
    res.status(200).json({
      status: "Success",
      message: "information updated successfully",
      user: userUpdated.rows[0],
    });
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

    if (newPassword !== confirmPassword){

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

    const passwordHashed = await hashPassword(newPassword);
    await pool.query({
        text: "UPDATE tbluser SET password = $1 WHERE id = $2",
        values: [passwordHashed, userId]
    });
        res.status(200).json({
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
