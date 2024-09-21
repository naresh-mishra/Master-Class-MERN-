const express=require("express");
const validate=require("../middleware/validate-middleware");
const contactUpSchema=require("../validators/contact_validator");
const router=express.Router();
const contactForm=require("../controller/contact-controller"); 
router.route("/contact").post(validate(contactUpSchema),contactForm);
module.exports=router;