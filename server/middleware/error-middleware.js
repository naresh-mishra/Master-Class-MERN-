const errorMiddleware=(err,req,res,next)=>{
  //next use for going to next step where it is define
  const status=err.status||500;
  const message=err.message||"backend error";
  const extraDetails=err.extraDetails||"error from backend";
  
  
  return res.status(status).json({message,extraDetails});
}
module.exports=errorMiddleware;