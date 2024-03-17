import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";


const AuthVerifyMiddleware =(req,res,next)=>{
    let Token=req.headers['token'];
    jwt.verify(Token,process.env.SECRET_KEY,function (err,decoded) {
        if(err){
            res.status(401).json({message:"unauthorized", data: "Token is not valid"})
        }
        else {
            let data =decoded['data'];
            req.headers.email= data?.email;
            req.headers.id= data?.id;
            next()
        }
    })
}

export default AuthVerifyMiddleware;
