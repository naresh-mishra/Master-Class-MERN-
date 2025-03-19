import { useState,useEffect } from 'react';
import { useAuth } from '../store/auth';
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaMessage } from "react-icons/fa6";


export const Contact = () => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const [contact, setContact] = useState({
        username: "",
        email: "",
        message: "",
    });
    const [userData,setUserData]=useState(true);
    const {user} =useAuth();
    
    useEffect(() => {
    if( userData && user){
        setContact({
            username:user.username,
            email:user.email,
            message:"",
        });
       setUserData(false); 
    }}, [user]);

    const handleInput = (e) => {
        console.log(e);
        let name = e.target.name;
        let value = e.target.value;
        setContact({
            ...contact,
            [name]: value,
        })
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
           const response=await fetch(`${API_BASE_URL}/api/form/contact`,{
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
    }
    const style = {  fontSize: "2em" ,margin:"0 0.5em"};
    return (
        <>
            <section >
                <main>
                    <div className="section-contact ">

                        <h1 className="main-heading mb-3 contact">Contact form</h1>
                        <div className="container grid grid-two-cols">
                            <div className="hero-image">
                                <img src="../public/services.png"
                                    alt="lets fill the contact  page"
                                    width="400"
                                    height="400"
                                />
                            </div>
                            <div className="login-form">
                                <br />
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        {/* <label htmlFor="username">Username</label> */}
                                        <FaUser style={style}/>
                                        <input
                                            type="text"
                                            name="username"
                                            placeholder="enter your username"
                                            id="username"
                                            required
                                            autoComplete="off"
                                            value={contact.username}
                                            onChange={handleInput}
                                        />
                                    </div>
                                    <div>
                                        {/* <label htmlFor="email">Email</label> */}
                                        <MdEmail style={style}/>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="enter your email"
                                            id="email"
                                            required
                                            autoComplete="off"
                                            value={contact.email}
                                            onChange={handleInput}
                                        />
                                    </div>

                                    <div className="message-div">

                                        {/* <label htmlFor="message" id="textmessage">Message</label> */}
                                        <div><FaMessage style={style}/></div>
                                        <div><textarea
                                            type="text"
                                            name="message"
                                            placeholder="message"
                                            id="message"
                                            required
                                            autoComplete="off"
                                            value={contact.message}
                                            onChange={handleInput}
                                            cols="30"
                                            rows="10"
                                        /></div>
                                    </div>
                                    <br />
                                    <button type="submit" className="btn btn-submit">Submit</button>
                                </form>
                            </div>
                        </div>


                    </div>
                </main>
                <section className="mb-3">
                    {/* google map->search->haldwani->embedded->copy-paste */}
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13929.36340000403!2d79.50785980282726!3d29.21352715563625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a09addbd0c86d1%3A0x6793e360cb3d930f!2sHaldwani%2C%20Uttarakhand%20263139!5e0!3m2!1sen!2sin!4v1713796265301!5m2!1sen!2sin" 
                    width="100%"
                    height="450"
                    allowFullScreen
                    loading="lazy" 
                    referrerpolicy="no-referrer-when-downgrade">
                    </iframe>
                    </section>
            </section>
        </>
    )
}