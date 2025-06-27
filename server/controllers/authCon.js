import { pool } from "../libs/db.js";
import { createJWT, passwordCompare } from "../libs/index.js";


export const signUpUser = async (req, res)=>{

    try {
        
        const {firstName, email, password} = req.body;
        if(!(firstName || email || password)){
            return res.status(404).json({
                status: "failed",
                message: "Please Provide Required Fields",
            });
        }

        const userExist = await pool.query({
            text: "SELECT EXISTS (SELECT * FROM tbluser WHERE email = $1)",
            values: [email],
        });

        if(userExist.rows[0].exists){
            return res.status(409).json({
                status: "failed",
                message: "User Already  Exists",
            });
        }

        const hashPassword = await hashPassword(password);
        const user = await pool.query({
            text: "INSERT INTO tbluser (firstname, email, password) VALUES ($1, $2, $3) RETURNING *",
            values: [firstName, email, hashPassword] 
        });

        delete user.rows[0].password;

        res.status(201).json({
            status: "success",
            message: "User Account Created Successfully",
            user: user.rows[0]
        });

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
        
        const {email, password} = req.body;

        const result = await pool.query({
            text: "SELECT * FROM tbluser WHERE email = $1",
            values: [email],
        });
        const user = result.rows[0];

        if(!user){
            return res.status(401).json({
                status: "failed",
                message: "Invalid EMail or Passowrd",
            });
        }
        const isMatch  = await passwordCompare(password, user?.password);
        if(!isMatch){
            return res.status(404).json({
                status: "failed",
                message: "Invalid EMail or Passowrd",
            });
        }
        const token = createJWT(user.id);
        delete user.password;
        res.status(200).json({
            status: "success",
            message: "LOgin Successfully",
            user,
            token,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "FAILED",
            message: error.message,
        })
    }
}