import { pool } from "../libs/db.js";


export const signUpUser = async (req, res)=>{

    try {
        
        const {firstName, email, passowrd} = req.body;
        if(!(firstName || email || passowrd)){
            return res.status(404).json({
                status: "failed",
                message: "Please Provide Required Fields",
            });
        }

        const user = await pool.query({
            text: "SELECT EXISTS (SELECT * FROM tbluser WHERE email = $1)",
            values: [email],
        });

        if(user.rows[0].userExist){
            return res.status(409).json({
                status: "failed",
                message: "User Already  Exists",
            });
        }

        // const hashPassword = 
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "FAILED",
            message: error.message,
        })
    }
}


export const signInUser = async (req, res)=>{

    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "FAILED",
            message: error.message,
        })
    }
}