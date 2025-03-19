require("dotenv").config();//for using env
const express=require("express");
const app=express();
const cors=require("cors");//back to frontend connection

const errorMiddleware=require("./middleware/error-middleware");

//inserting a path of auth-router folder in router
const authrouter=require("./router/auth-router");
const contactRouter=require("./router/contact-router");
const serviceRouter=require("./router/service-routere");
const adminroute=require("./router/admin-router");
const paymentrouter=require("./router/paymentRouter");//payment router
const connectdb=require("./utils/database");

//lets tackle cors
const corseOptions=
{//for making connection and telling backend that this url can be accessed (it is a part of our family )
   origin: "https://frontend-masterclass-naresh.onrender.com",
   methods:"GET,POST,PUT,DELETE,PATCH,HEAD",
   credentials:true,
}
app.use(cors(corseOptions));
app.use(express.urlencoded({extended:true}));
app.use(express.json());//middleware so we can use parsing json data from request
// using router by calling "localhost:5000/api/auth" for home page and 
//"localhost:5000/api/auth/register" for reg one.
app.use("/api/auth",authrouter);
app.use("/api/form",contactRouter);
app.use("/api/data",serviceRouter);
app.use(errorMiddleware);

//lets define admin route
app.use("/api/admin",adminroute);
//payment route
app.use("/api/payment",paymentrouter);

//Now this code will work only when above router is not working
// app.get("/",(req,res)=>{
//     res.status(200).send('hello naresh');
// });

// app.get("/register",(req,res)=>{
//     res.status(200).send('hello naresh register');
// });

const PORT=process.env.PORT||5000;
//if connectdb is done proper then we will make a server only
connectdb().then(()=>{
app.listen(PORT,()=>{
   console.log(`server is running at port:${PORT}`);
});
}) 
.catch((error) => {
   console.error("❌ Database connection failed:", error);
   process.exit(1); // Exit the process if DB connection fails
 });
