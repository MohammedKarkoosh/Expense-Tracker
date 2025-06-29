import JWT from "jsonwebtoken";


const authMiddleWare = async(req, res, next)=>{

    const authHeaderToken = req?.header?.authorization;

    if (!authHeaderToken || !authHeaderToken?.startWith("Bearer")){
        return res.status(401).json({
            status: "auth_failed"
        })
    }



}