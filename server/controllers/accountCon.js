import express from "express";



export const getAccount=(res, req)=>{

    try {
        const {accountId} = req.accountId;
        if(!accountId){
            return res.status(404).JSON({
                status:"Fail",
                message: "Account Not Found"
            });
        }



    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "FAILED",
            message: error.message,
        });
    }
}

export const addMoneyToAccount=(res, req)=>{
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "FAILED",
            message: error.message,
        });
    }
}

export const createAccount=(res, req)=>{

    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "FAILED",
            message: error.message,
        });
    }
}