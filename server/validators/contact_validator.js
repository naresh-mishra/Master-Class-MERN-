const {z}=require("zod");
const contactformSchema=z.object({
    username:z
    .string({required_error:"username is required"})
    .min(3,{message:"username must be atleast of 3 characters"})
    .max(20,"username must not be more than 10 characters"),
    email:z
    .string({required_error:"Email is required"})
    .min(3,{message:"Email must be atleast of 3 characters"})
    .email({message:"Enter valid eamil"})
    .max(255,{message:"Email must not be more than 255 characters"}),
   message:z
    .string({required_error:"message is required"})
    .min(7,{message:"message must be atleast of 7 characters"})
    .max(1024,"message must not be more than 1024 characters"),
});
module.exports=contactformSchema;