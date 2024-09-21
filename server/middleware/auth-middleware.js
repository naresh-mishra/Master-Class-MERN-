const jwt=require('jsonwebtoken');
const User=require("../models/user-model");

const authMiddleware=async(req,res,next)=>{
    const token=req.header('Authorization');
    if(!token){
        return res.status(401).json({message:"unathorizes http,token not provided"});
    }
    //assuming token is in the formatt "Bearer <jwt token>,removing the "Bearer" prefix
    const jwtToken=token.replace("Bearer","").trim();//removing bearer ans space from token
    console.log("token form auth middleware",jwtToken);
    try{
        const isVerified=jwt.verify(jwtToken,process.env.JWT_SECRET_KEY);//all realted with jwt in USER model
        console.log(isVerified);//get all the data that declared in jwt in USER model
        const userData=await User.findOne({email:isVerified.email}).
        select({
            password:0,
        });
        console.log(userData);
        //req object is an object that contains information about the HTTP req
        // .by adding custom properties to req ,you can pass information between middleware
        // function or make it available in your route handlers.
        req.user=userData;
        req.token=token;
        req.userID=userData._id;
        next();

    }catch(err){
        return res.status(401).json({message:"Unauthorized web token"});
    }
};
module.exports=authMiddleware;