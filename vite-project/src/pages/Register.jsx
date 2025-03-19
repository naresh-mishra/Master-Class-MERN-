
import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import {useAuth} from "../store/auth";
import {toast} from "react-toastify";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { Eye, EyeOff } from "lucide-react"; //passowrd one 

export const Register=()=>{
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const [user,setUser]=useState({
        username:"",
        email:"",
        phone:"",
        password:"",
    });
    //password eye code
    // const PasswordInput = ({ user, handleInput }) => {
        const [showPassword, setShowPassword] = useState(false);
    // }
    const navigate=useNavigate();
    const {storeTokenInLs}=useAuth();
    //handling the input values as we change any value it will updated
    const handleInput=(e)=>{
        console.log(e);
        let name=e.target.name;//field name like email,password
        let value=e.target.value;//vlaue inside field 
        setUser({
            ...user,//if we change any field that field will only be changed not other

            [name]:value,//dynamic as we change any field name value changed or updated
            //  it will get that value and update it in that field 
            // ex-we have changed password then it will not chnaged any field other 
            // then pswrd and in place of name we get password and in value changed 
            // value of password updated to that field
        })
    }
    //handling the form submission
    const handleSubmit=async(e)=>{
     //as when we submitt form it by default reload the page so handle it
     e.preventDefault();
     console.log(user);
     //connecting backend with frontend 
     try{
        //fetch(fetch return promise)this backend url and post user data in database
     const response=await fetch(`${API_BASE_URL}/api/auth/register`,{
         method:"POST",
         headers:{
            "Content-Type":"application/json",
         },
         body:JSON.stringify(user),
     });
    //  for clearing our field in frontend when we successfully send the data in database
     const res_data=await response.json();
     console.log("res from server",res_data.extraDetails);
         if(response.ok){
            //store the token in local storage
            // localStorage.setItem("token",res_data);
            storeTokenInLs(res_data.token);
           toast.success("Registered Successfully");
          setUser({
            username:"",
            email:"",
            phone:"",
            password:"",
          });
          navigate("/");
     }
     else{
       toast.error(res_data.extraDetails?res_data.extraDetails:res_data.message);
     }
     console.log(response);
    }
    catch(err){
        console.log("register:",err);
    }
    };
    const style = {  fontSize: "2em" ,margin:"0 0.5em"};
    return (
    <>
      <section>
        <main>
            <div className="section-registration">
                
                <div className="container grid grid-two-cols">
                    <div className="hero-image">
                        <img src="../public/services.png" 
                             alt="a girl is trying to do registeration"
                             width="400"
                             height="400"
                              />
                    </div>
                    <div className="registration-form">
                        <h1 className="main-heading mb-3">Registration form</h1>
                        <br/>
                        <form onSubmit={handleSubmit}>
                            <div>
                                {/* <label htmlFor="username">Username</label> */}
                                <FaUser style={style}/>
                                <input
                                   type="text"
                                   name="username"
                                   placeholder="username"
                                   id="username"
                                   required
                                   autoComplete="off"   
                                   value={user.username}
                                   onChange={handleInput}
                                />
                            </div>
                            <div>
                                {/* <label htmlFor="email">email</label> */}
                                <MdEmail style={style}/>
                                <input
                                   type="email"
                                   name="email"
                                   placeholder="enter your email"
                                   id="email"
                                   required
                                   autoComplete="off"   
                                   value={user.email}
                                   onChange={handleInput}
                                />
                            </div>
                            <div>
                                {/* <label htmlFor="phone">phone</label> */}
                                <FaPhoneSquareAlt style={style}/>
                                <input
                                   type="number"
                                   name="phone"
                                   placeholder="phone"
                                   id="phone"
                                   required
                                   autoComplete="off"   
                                   value={user.phone}
                                   onChange={handleInput}
                                />
                            </div>
                            <div>
                                {/* <label htmlFor="password">password</label> */}
                                <RiLockPasswordFill style={style}/>
                                <input
                                   type={showPassword ? "text" : "password"}
                                   name="password"
                                   placeholder="password"
                                   id="password"
                                   required
                                   autoComplete="off"   
                                   value={user.password}
                                   onChange={handleInput}
                                />
                                  <button
                                      type="button"
                                    //   style={{width: "50px",height: "30px",}}
                                      className="absolute right-3 top-1/2 transform -translate-y-1/2 eye"
                                      onClick={() => setShowPassword(!showPassword)}
                                  >
                                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                 </button>
                            </div>
                            <br/>
                            <button type="submit" className="btn btn-submit">Register Now</button>
                        </form>
                    </div>
                </div>


            </div>
        </main>
      </section>
    </>
)}