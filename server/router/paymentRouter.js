const Payment=require("../controller/paymentController");
const express=require("express");

const router=express.Router();

router.route("/checkout").post(Payment.checkout);
router.route("/verification").post(Payment.paymentVerification);
router.route("/keyid").get(Payment.paymentId);

module.exports=router;