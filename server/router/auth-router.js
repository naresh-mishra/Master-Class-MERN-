const express=require("express");
const signupSchema=require("../validators/auth_validator");
const validate=require("../middleware/validate-middleware");
const authMiddleware=require("../middleware/auth-middleware");
const router=express.Router();
// const {home,register}=require("../controller/auth-controllers");
// we have to require to many functions for more simplicity we have maked a varibale name 
// authcontroller by pointing it we doesnt have to require all functions like above code
const authcontrollers=require("../controller/auth-controllers");
const loginUpSchema = require("../validators/login_validators");
// router.route("/").get(authcontrollers.home);
// for adding data in database we use post instead of get=read data
router.route("/").post(authcontrollers.home);
//The simplified code is written above 
// router.route("/").get((req,res)=>{
//    res.status(200).send("Welcome to world best mern series by naresh");
// });
// router.route("/register").post(authcontrollers.register);
router.route("/register").post(validate(signupSchema),authcontrollers.register);
// router.route("/login").post(authcontrollers.login);
router.route("/login").post(validate(loginUpSchema),authcontrollers.login);
router.route("/user").get(authMiddleware,authcontrollers.user);
//authmiddleware give current user data

module.exports=router;