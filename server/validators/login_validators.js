const {z}=require("zod");
const loginUpSchema=z.object({
    email:z
    .string({required_error:"Email is required"})
    .trim()
    .email({message:"Invalid email address"})
    .min(3,{message:"Email must be atleast of 3 characters"})
    .max(255,{message:"Email must not be more than 255 characters"}),
    password:z
    .string({required_error:"Password is required"})
    .min(7,{message:"Password must be atleast of 7 characters"})
    .max(255,{message:"Password must not be more than 255 characters"}),
});
module.exports=loginUpSchema;