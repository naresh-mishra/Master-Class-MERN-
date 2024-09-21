
const Contact=require("../models/contact-model");
const User=require("../models/user-model");
//get all the data of user from database
const getAllUser=async(req,res)=>{
    try{
        const users=await User.find({},{password:0});
        //fetching all user data
        console.log(users);
        if(!users)
        {
         return res.status(400).json({message:"no user found"});
        }
        return res.status(200).json(users);
     }catch(err)
     {
         next(err);
     }
}

//fetching single user data logic
const getUserById=async(req,res)=>{
    try{
        const id=req.params.id;
        const data=await User.findOne({_id:id},{password:0});
        //fetching single user data 
        return res.status(200).json(data);
     }catch(err)
     {
         next(err);
     }
}

//updating user data which id is given
const updateUserById=async(req,res)=>{
    try{
         const id=req.params.id;//get id by url which one to update
         const updateUserData=req.body;//data which is to be updated

         const updateData=await User.updateOne(
            {_id:id},//check id which is to be updated in database
            {$set:updateUserData}//update data
         );
         return res.status(200).json(updateData);//send updated data to frontend
    }catch(err){
        return res.status.json({message:"user not updated "});
    }
}
// user delete logic
const deleteUserById=async(req,res)=>{
  try{
     const id=req.params.id;//if user data (id)pass in url then fetch that data code
     await User.deleteOne({_id:id});//if the  id in database match the id pass by frontend then delete
     return res.status(200).json({message:"user deleted successfully"});
    }
  catch(err){
    next(err);
  }
}

//get all the data of contact form database
const getAllContact=async(req,res)=>{
    try{
        const contacts=await Contact.find();
        console.log(contacts);
        if(!contacts)
        {
         return res.status(400).json({message:"no user found"});
        }
        return res.status(200).json(contacts);
     }catch(err)
     {
         next(err);
     }
}
//delete data of contact by id 
const deleteContactById=async(req,res)=>{
    try{
        const id=req.params.id;//if user data (id)pass in url then fetch that data code
        await Contact.deleteOne({_id:id});//if the  id in database match the id pass by frontend then delete
        return res.status(200).json({message:"Contact deleted successfully"});
       }
     catch(err){
       next(err);
     }
}
module.exports={getAllUser,getAllContact,deleteUserById,getUserById,updateUserById,deleteContactById};