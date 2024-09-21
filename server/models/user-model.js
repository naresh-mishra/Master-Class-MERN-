const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

//it will create the schema structure
const userSchema=new  mongoose.Schema({
    username:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
});

//database store krne se phle this method automatically call
userSchema.pre("save",async function(next){
  const user=this;//this has all the data which is gooing to be store in database
  if(!user.isModified("password")){
     return next();
  }
  try{
      const saltRound=await bcrypt.genSalt(10);
      const hash_password=await bcrypt.hash(user.password,saltRound);
      user.password=hash_password;
    }
    catch(errr){
    return next(errr);  
  }
});
//json web token
//methods is a instance method where we can define various methods
// this store all the data which is added to database
userSchema.methods.generateToken=async function(){
  try{
    return jwt.sign(
      {
       userId:this._id.toString(),
       email:this.email,
       isAdmin:this.isAdmin,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn:"30d",
    }  
  );
  }catch(err){
      console.error(err);
  }
};
userSchema.methods.comparePassword=async function(password){
  return  bcrypt.compare(password,this.password);
};
// define the model or collection name
// user (U)capital
const User=new mongoose.model("User",userSchema);
module.exports=User;
