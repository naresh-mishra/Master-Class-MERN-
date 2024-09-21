const Contact=require("../models/contact-model");
const contactForm=async(req,res)=>{
    try{
         const response=req.body;
         await Contact.create(response);//add data to a collection Contact inside 
         //database and add data req.body from postman
         return res.status(200).json({message:"message sent successfully"});
    }catch(err){
        next(err);
    }
}
module.exports=contactForm;