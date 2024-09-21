const User=require("../models/user-model");
const bcrypt=require("bcryptjs");
const home=async(req,res)=>{
    try{
          res.status(200).send("welcome to controller home page");
    }catch(err){
        console.log(err);
    }
};
const register=async(req,res)=>{
    try{
        console.log(req.body);//the code wriiten in body inside postman or by user 
        const {username,email,phone,password}=req.body;//acess the element of postman body 
        const userExist=await User.findOne({email:email});//comapare email of all user 
        //database with body of postman email 
        if(userExist){
            return res.status(400).json({message:"email already exist"});          
        }
        //hash the password->means securing it by giving it hash value
        // const saltRound=10;
        // const hash_password=await bcrypt.hash(password,saltRound);
        //this above lines can be more clarify in user-model.js

        const userCreated=await User.create({
            username,
            email,
            phone,
            password});
        //if not exist same email then add to user database 
        //   res.status(200).json({message:userCreated});
          res.status(201).json({
            message:"registration successfull",
            token:await userCreated.generateToken(),//token generated in user-model file
            userId:userCreated._id.toString(),//_id get is in object for other use we have create it in string 
            });

    }catch(err){
        // res.status(500).json({message:"Internal server error"});
        next(err);
    }
};
// user login logic
const login=async(req,res)=>{
    try{
        const{email,password}=req.body;//get email and password of postman body
        const userExist =await User.findOne({email});//compare email of postman body with 
        //databse email
        console.log(userExist);
        
        if(!userExist){//if not match then print
            return res.status(400).json({message:"Invalid Credentials"});
        }
        // const user=await bcrypt.compare(password,userExist.password);//compare password 
        //with postman body password

        const user=await userExist.comparePassword(password);//another method by instance function which we define in user-model.js
        
        if(user){ //if match or true then
            res.status(200).json({//print in postman run window
                message:"login successfull",
                token:await userExist.generateToken(),
                userId:userExist._id.toString(),
                });
        }
        else{//if not then invalid
            res.status(401).json({message:"Invalid email or password"});
        }
    }catch(error){//if try get error then print internal server error
        // res.status(500).json({message:"Internal server error"});
        next(err);
    }
}
//user login -to send user data
const user=async (req,res)=>{
try{
    const userData=req.user;//req.user get from authmiddlewawre 
    console.log(userData);
    return res.status(200).json({userData});//sending to frontend
}
catch(err){
    console.log(`error from the user route ${err}`);
}
}
module.exports={home,register,login,user};