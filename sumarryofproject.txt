first we have make a folder of server--backend
then npm init ---for loading package.json file
then install express--npm i express
and nodemon(for restarting the server whenever you save file) --npm i nodemon--(ex=nodemon server.js)
then inside server folder we have make a server.js file
//----------------
for best technique or for multiple pages separation we use routers 
we have maked a router folder and a file name auth-router.js in which we have to exportrouter
in server.js we have require router which we have exported form auth-router
//--now we can make controller for simplifying our code moree
we have created controller folder and a file name auth-controller and make a home 
function which we have exported and require in auth-router and use in our auth-router file
same as for reg page
//now install postman for handling post req for fetching data from body for getting the 
data which the user has written inside body
//now we will connect backend(node,express)with database(mongodb)
go to atlas and check network access and database access
then npm i mongoose inside server
now make a folder utils and inside a folder database.js
write a code that connect with express with local database
then if connection suuccsesful then in server.js make a server
--now we have install "npm i dotenv" for securing our private data
 password-D0a7Yf6XGhcC0Bde
 username-nareshmishra8535
first go to atlas and make a new project -MERN_Pr1 and then deploy it and select password 
then go to database.js then connect your uri
--then make .env file(it will hide data) inside server then insatll extension dotenv official 
then the uri will paste there and then click toggle auto clicking and then in database.js
write uri=process.env.MONGODB_URI;
then in server.js require dotenv then connect it.

--make a folder models -user-model.js...now we create a schema which tells the structure
 of data and create a models
 --now in previous file auth-controller in register we get the postman body data
 and then compare its email with our database email if its already exist then dont add if 
 not exist then add it to user collection in mern_admin database you can see in atlas
 --now for securing our password we use hashing 
npm i bcryptjs
in auth-controller.js we require it and use the hash for securing our password 
we can do it by another method(userSchema.pre()) in user-model.js 
--now we use (json web token) for securely tranmitting information between parties as a 
json object.
Authentication--verifying the identity of a user or client
AUthorization-- determining what actions a user or client is allowed to perform.
json web token issued by the server during the authentication process and store on the client
side for later use.
now in auth-controller.js file we use this line for generating token-->
"""res.status(200).json({
            message:"registration successfull",
            token:await userCreated.generateToken(),
            userId:userCreated._id.toString(),
            });"""
now in user-model.js we define generateToken function
and we make a secretkey name in .env file and use it in generateToken function
--login router
in auth-router define route for login then in authcontroller we define login function 
then export login
--now we use validations ....we make a folder called validators and inside 
auth_validator.js we install (npm i zod) we define a schema with set of rule for every field
make a new folder middleware and inside validate-middleware.js for comparing all the fields
with body of postman it is valid or not
now in router/auth-router.js we define a line 
"router.route("/register").post(validate(signupSchema),authcontrollers.register);"
now it will validate all the field and after validating go to (authcontroller.register)
--now we use error middleware to collect all the error in backend and show in frontend
now inside middleware me make a file error-middleware.js ---next(err) go to error middleware
auth-controller.js ->catch{next(err)};
in validate-middleware.js->inside 
catch{
    const message="error bawa";
    const status=422;
    const extraDetails=err.errors[0].message;
    const error={
      status,message,extraDetails,
    }
   next(error);}
in server.js--->const errorMiddleware=require("./middleware/error-middleware");
               app.use(errorMiddleware);
--now for error midlleware for login make a file inside validator -->login_validator
and make chnages in auth-router.js 
router.route("/login").post(validate(loginUpSchema),authcontrollers.login); 
--now we will make a (contact-model.js) schema for contact form  
  we make a folder contact-controller inside controller which get data from postman and add data to db
  and we make a contact-router inside router which will tells us go to contact-controller
  (from server.js)we call by api/form/contact-router/contact-controller
  for error handling we make a contact_validator and we have already maked a 
  validate-middleware in middleware and in contact router we define it and in 
  contact-controller we define next(err)in catch which will go to error middleware
  --------------------------------------------------------
  frontend -->go to MERN_Pr1 and type command
  npm create vite@latest
  select react ,javascript
  go inside vite-project and type command
  cd vite-project
  npm install
  npm run dev
  now you can change app.jsx for your need ...the main file is main.jsx where we import app.jsx 
  ---now we install (npm i react-router-dom) for when we add url to address bar 
  how it access the web page 
  we written router code in app.jsx for accessing home,about,register,login,service etc
 and define this pages in pages folder ...
 ......note++++
 when we export function default it is acess simply but when it is not default it is 
 access like object
--we make a folder called components and inside it will make a folder Navbar.jsx
which we import on app.jsx and define below browserrouter 
for not reloading page we import navlink in navbar.jsx and replae anchor tag with navlink
and href replace with to hence now it will not reload
--now create registration form 
--now create login form
--now create home page..footer created in component for footer we have added it in 
app.jsx at last after routes 
--now create about page 
--now create contact page 
--and a error page when user define an unknown path and set it in app.jsx
<Route path="*" element={<Error/>}/>
------------------------------------------------------------
connecting frontend with backend -->
we write a code in register.jsx 
"
import {useNavigate} from "react-router-dom";
const navigate=useNavigate();
  try{
    //postman code 
     const response=await fetch(`http://localhost:5000/api/auth/register`,{
         method:"POST",
         headers:{
            "Content-Type":"application/json",
         },
         body:JSON.stringify(user),
     });
     //for clearing our field in frontend when we successfully send the data in database
         if(response.ok){
          setUser({
            username:"",
            email:"",
            phone:"",
            password:"",
          });
          navigate("/login");
          //when we click in register now then we go to login page
     }
     console.log(response);
    }catch(err){
        console.log("register:",err);
    }
    "
    in server.js ...we install (npm i cors )because how frontend is running in port 
5173 and backend is connecting in 5000 so by cors we tackel this problem
we write a code-->//however in production it doesnt give error because they both running on same vps server
"const cors=require("cors");
const corseOptions=
{//for making connection and telling backend that this url can be accessed 
   origin:"http://localhost:5173",
   methods:"GET,POST,PUT,DELETE,PATCH,HEAD",
   credentials:true,

}
app.use(cors(corseOptions)); 
"
--now for login we use same code as in registger.jsx
--now we see how we can store token in local storage 
piece of code in register.jsx" const res_data=await response.json();
            console.log("res from server",res_data);
            //store the token in local storage
            // localStorage.setItem("token",res_data);
            storeTokenInLs(res_data.token);"
and make a folder inside source store and a file auth.jsx 
now we wite a code in main.jsx
import { AuthProvider } from './store/auth.jsx'
<AuthProvider></AuthProvider>
//this code means the in auth.jsx we define a function authprovider that is getted by 
authprovider in main.jsx and the value inside AuthContext.Provider will be accessed 
by all files and folder directly
--in authrouter we define another path user for getting data by a token when 
user login in a page
"router.route("/user").get(authMiddleware,authcontrollers.user);"
and now in authmiddleware we write a code 
and then in authcontroller inside user we get a user details
--now going to frontend we write this code 
" const [user,setUser]=useState("");
const userAuthentication=async()=>{
        try{
            const response=await fetch("http://localhost:5000/api/auth/user",{
                method:"GET",
                headers:{
                     Authorization:`Bearer ${token}`,
                },
            });
        if(response.ok){
            const data=await response.json();
            setUser(data);
            console.log("userdata",data);
        }
        }catch(err){
            console.log("Error fetching user daata");
        }
    }
    useEffect(()=>{
        userAuthentication();
    },[]);"
and pass provider user for accesing it anywhere
and now we can access user in any page like contact,about
--now in contact.jsx form while we have logged in --in an message we write message and
 it pass through database and store the inforamtion 
 the code is 
 "  const handleSubmit = async(e) => {
        e.preventDefault();
        try{
           const response=await fetch(`http://localhost:5000/api/form/contact`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(contact),

           });
           if(response.ok){
              setContact({
                username: "",
                email: "",
                message: "",
               });
               const data=await response.json();
               console.log(data);
               alert("Message send successfully");
           }
        }catch(err){
            alert("Message not send successfully");
            console.log(err);
        }
    }"
--now for getting that data you write the code in backend service-controller.js
to get the data
--now for getting data in frontend we write a code in auth.jsx getservices() method