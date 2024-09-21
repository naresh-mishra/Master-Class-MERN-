const adminMiddleware=(req,res,next)=>{
    try{
    //   console.log(req.user);
      const adminRole=req.user.isAdmin;// if isAdmin value false then access denied not go to next
      if(!adminRole)
      {
        return res.status(403).json({error:"Access denied,User is not an admin"});
      }
      //   res.status(200).json({msg:req.user.isAdmin});

      next();//if user is an admin then go to next middleware
    }catch(err)
    {
        next(err);
    }
}
module.exports=adminMiddleware;