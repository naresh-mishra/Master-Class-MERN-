const mongoose=require("mongoose");
//this uri is local database that we get by cmd-mongosh command (mern_admin)is a random 
//file name
// const URI="mongodb://127.0.0.1:27017/mern_admin";
const URI=process.env.MONGODB_URI; 
 connectdb=async()=>{
    try{
        await mongoose.connect(URI);//connect with db    
        console.log("Connection successfull to db");

    }catch(err){
        console.error("database connection fail");
        process.exit(0);
    }
};
module.exports=connectdb;//exported to server.js

