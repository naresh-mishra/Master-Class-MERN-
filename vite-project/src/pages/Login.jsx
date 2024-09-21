import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../store/auth";
import {toast} from "react-toastify";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

export const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();//--
    const {storeTokenInLs}=useAuth();//--

    const handleInput = (e) => {
        console.log(e);
        let value = e.target.value;
        let name = e.target.name;
        setUser({
            ...user,
            [name]: value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user);
        try {
            const response = await fetch(`http://localhost:5000/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user)
            });
            // console.log("login-form", response);
            // alert("erroe");
            const res_data=await response.json();
            if (response.ok) {
                console.log("res from server",res_data);
                //store the token in local storage
                // localStorage.setItem("token",res_data);
                storeTokenInLs(res_data.token);
                toast.success("login successfully");
                setUser({ email: "", password: "" });
                navigate("/");
            }
            else {
                // alert(res_data.extraDetails?res_data.extraDetails:res_data.message);
                toast.error(res_data.extraDetails?res_data.extraDetails:res_data.message);
                console.log("Invalid credentials");
            }

        } catch (err) {
            console.log(err);
        }
    }
    const style = {  fontSize: "2em" ,margin:"0 0.5em"};
    return (
        <>
            <section>
                <main>
                    <div className="section-registration">

                        <div className="container grid grid-two-cols">
                            <div className="registration_image">
                                <img src="../public/services.png"
                                    alt="lets fill the login page"
                                    width="500"
                                    height="500"
                                />
                            </div>
                            <div className="registration-form">
                                <h1 className="main-heading mb-3">Login form</h1>
                                <br />
                                <form onSubmit={handleSubmit}>

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
                                            value={user.email}
                                            onChange={handleInput}
                                        />
                                    </div>

                                    <div>
                                        {/* <label htmlFor="password">Password</label> */}
                                        <RiLockPasswordFill style={style}/>
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="password"
                                            id="password"
                                            required
                                            autoComplete="off"
                                            value={user.password}
                                            onChange={handleInput}
                                        />
                                    </div>
                                    <br />
                                    <button type="submit" className="btn btn-submit">Login Now</button>
                                </form>
                            </div>
                        </div>


                    </div>
                </main>
            </section>
        </>
    )
}