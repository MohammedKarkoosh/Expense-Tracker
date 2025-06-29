import { pool } from "../libs/db.js";

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
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "Failed",
      message: error.message,
    });
  }
};
