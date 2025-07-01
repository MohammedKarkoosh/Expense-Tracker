import express from "express";
import { pool } from "../libs/db";

export const getAccount = async (req, res) => {
  try {
    const { userId } = req.user;

    const getAccounts = await pool.query({
      text: "SELECT * FROM tblaccount WHERE user_id = $1",
      values: [userId],
    });
    if (!userId) {
      return res.status(404).JSON({
        status: "Fail",
        message: "User Not Found",
      });
    }
    res.status(200).JSON({
      status: "Success",
      data: getAccounts.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "FAILED",
      message: error.message,
    });
  }
};

export const addMoneyToAccount = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "FAILED",
      message: error.message,
    });
  }
};

export const createAccount = async (req, res) => {
  try {
    const { userId } = req.user;
    const { account_name, account_balance, account_number } = req.body;

    const isAccount = await pool.query({
      text: "SELECT * FROM tblaccount WHERE account_name = $1 AND user_id=$2",
      values: [account_name, userId],
    });
    const accountExist = isAccount.rows[0];
    if (isAccount) {
      res.status(409).json({
        status: "FAILED",
        message: "Account Exists Already",
      });
    }

    const createAccounts = await pool.query({
        text:"INSERT INTO tblaccount(user_id, account_name, account_number, account_balance) VALUES($1, $2, $3, $4)",
        values:[userId, account_name, account_number, account_balance]
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "FAILED",
      message: error.message,
    });
  }
};
