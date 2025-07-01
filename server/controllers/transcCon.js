import { pool } from "../libs/db.js";

export const getTransc= async(req, res)=>{

    try {
        const {userId} = req.user;
        const today = new Date();
        const week = new Date(today);
        week.setDate(today.getDate()-7);

        const sevenDaysAgo = week.toISOString().split("T")[0];
        const {df, dt, s}= req.query;
        
        const startDate = new Date(df || sevenDaysAgo);
        const endDate = new Date(dt || new Date());

        const transc = await pool.query({
            text:"SELECT * FROM tbltranscations WHERE user_id = $1 AND createdAt BETWEEN $2 AND $3  ORDER BY id DESC",
            values:[userId, startDate, endDate]
        })


    } catch (error) {
            console.log(error);
    return res.status(500).json({
      status: "Failed",
      message: error.message,
    });
    }
}

export const addTransc=async (req, res)=>{


    try {
        
    } catch (error) {
            console.log(error);
    return res.status(500).json({
      status: "Failed",
      message: error.message,
    });
    }
}

export const transferMoneyToAccount= async(req, res)=>{


    try {
        
    } catch (error) {
            console.log(error);
    return res.status(500).json({
      status: "Failed",
      message: error.message,
    });
    }
}

export const getDashInfo= async(req, res)=>{


    try {
        
    } catch (error) {
            console.log(error);
    return res.status(500).json({
      status: "Failed",
      message: error.message,
    });
    }
}