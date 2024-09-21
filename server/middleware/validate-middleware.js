
const validate=(schema)=>async(req,res,next)=>{
try{
   const parseBody=await schema.parseAsync(req.body);//compare user field data with schema
   req.body=parseBody;
   next();
}catch(err){
    const message="error bawa";
    console.log(message);
    console.log(err);//err is an object hold the things which is not correct --from schema
    const status=422;
    const extraDetails=err.errors[0].message;
   //  console.log(err);
    const error={
      status,message,extraDetails,
    }
   // res.status(400).json({msg:message});
   next(error);
}
};
module.exports=validate;