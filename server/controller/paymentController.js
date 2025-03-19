const instance=require("../razorpay-instance");
const crypto=require("crypto");
const payment=require("../models/payment-model");

const checkout=async(req,res)=>{
  const {price}=req.body;
  try{
    const options={
    amount:Number(price)*100,//amount in the smallest currency//
    currency:"INR"
      };
  const order=await instance.orders.create(options);
  console.log(order);
  res.status(200).json({success:true,order});
  }
  catch(error){
    console.error(error);
    res.status(500).json({ success: false, message: "Order creation failed" });
  }
};

const paymentVerification=async(req,res)=>{
  const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=req.body;
  const body=razorpay_order_id+"|"+razorpay_payment_id;
  const expectedSignature=crypto.createHmac('sha256',process.env.RAZORPAY_SECRET_KEY)
                                                   .update(body.toString())
                                                   .digest('hex');
                                                   console.log("sig received",razorpay_signature);
                                                   console.log("sig generated",expectedSignature);
  const isAuthentic=razorpay_signature===expectedSignature;
  if(isAuthentic)
  {
    //database store
    await payment.create({
      razorpay_order_id,razorpay_payment_id,razorpay_signature
    })
    res.redirect(`https://frontend-masterclass-naresh.onrender.com/paymentsuccess?reference=${razorpay_payment_id}`);
  }
  else
  {
    res.status(400).json({success:false});
  }
};

const paymentId=async(req,res)=>{
    res.status(200).json({key:process.env.RAZORPAY_API_KEY});
};
module.exports={checkout,paymentVerification,paymentId};
