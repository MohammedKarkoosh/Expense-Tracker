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
    const {userId} = req.user;
    const {id} = req.params;
    const {amount} = req.body;
    
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
        text:"INSERT INTO tblaccount(user_id, account_name, account_number, account_balance) VALUES($1, $2, $3, $4) RETURNING *",
        values:[userId, account_name, account_number, account_balance]
    });
    const account = createAccounts.rows[0];
    const userAccounts = Array.isArray(userName)? userName : [userName];
    const updateUserAccountsQuery = {
        text:"UPDATE tbluser SET accounts = array_cat(accounts, $1), updatedate = CURRENT_TIMESTAMP WHERE id=$2 RETURNING *",
        values:[userAccounts,userId]
    };
    await pool.query(updateUserAccountsQuery);
    const desc = account.account.account_name+" (Initail Deposit)";

    const InitailDeposite = await pool.query({
        text:"INSERT INTO tbltransaction(user_id, description, type, status, amount, source) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
        values:[userId, desc, "Icome","Completed", account_balance, account.account_name]
    });
    res.status(200).JSON({
      status: "Success",
      message: "Account Created " + account.account_name,
      data: account,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "FAILED",
      message: error.message,
    });
  }
};
