import JWT from "jsonwebtoken";


const authMiddleWare = async(req, res, next)=>{

    const authHeaderToken = req.headers.authorization;

    if (!authHeaderToken || !authHeaderToken?.startsWith("Bearer ")){
        // "Bearer" is a type that tells the server how to interpret the token.
        return res.status(401).json({
            status: "auth_failed",
            message:"Authroization Fialed"
        })
    }
    // Splits the string to extract the actual JWT, which follows the word "Bearer"
    const authToken = authHeaderToken?.split(" ")[1];

    try {
        const decoded = JWT.verify(authToken, process.env.JWT_SECRET);

        req.user = {
            userId:decoded.userId,
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            status: "auth_failed",
            message: "Invalid or expired token "
        })
    }
}

export default authMiddleWare;