import { useState,useEffect } from "react";
import {useAuth} from "../store/auth";
import {useParams} from "react-router-dom";//for fetching id from url
import {toast} from 'react-toastify';

export const AdminUpdate = () => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const params=useParams();
    const {authorizationToken}= useAuth();

    const [data, setData] = useState({
        username: "",
        email: "",
    });

//get single user data
    const getUserData=async(req,res)=>{
        try{
            //this params.id we got by admin-user.jsx where we have define link
            const response=await fetch(`${API_BASE_URL}/api/admin/users/${params.id}`,{
                method:"GET",
                headers:{
                     Authorization:authorizationToken,//token from local storage
                },
            });
            const data=await response.json();
            console.log(`single data of user for admin update:${data}`);
            setData(data);
        }
        catch(err)
        {
            console.log(err);
        }   
    }
    useEffect(()=>{
        getUserData();
    },[]);
    const handleInput = (e) => {//event is an object get by function
        console.log(e);
        let value=e.target.value;
        let name=e.target.name;
        setData({
            ...data,
            [name]:value,
        })
    };
    //to update the change data
    const handleSubmit=async(e)=>{
     e.preventDefault();
         try{
            const response=await fetch(`${API_BASE_URL}/api/admin/users/update/${params.id}`,
                {
                  method:"PATCH",
                  headers:{
                    "Content-Type":"application/json",//whenever post and and update sending data then we have to write this
                    Authorization:authorizationToken,
                  },
                  body:JSON.stringify(data),
            });
            // console.log(response);
            if(response.ok){
                toast.success("Updated Successfully");
            }
            else{
                 toast.error("Not updated");
            }
     }catch(err){
        console.log(`update data error:${err}`);
     }
    }

    return (
        <section className="section-contact">
            <div className="contact-content container">
                <h1 className="main-heading mb-3">Update User Data</h1>
            </div>
            <div className="container grid grid-two-cols">
                <section className="section-form">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                name="username"
                                placeholder="enter your username"
                                id="username"
                                required
                                autoComplete="off"
                                value={data.username}
                                onChange={handleInput}
                            />
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="enter your email"
                                id="email"
                                required
                                autoComplete="off"
                                value={data.email}
                                onChange={handleInput}
                            />
                        </div>
                        <button type="submit">Update</button>
                    </form >
                </section>
            </div>
     </section >
)
}