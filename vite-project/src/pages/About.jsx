import {useState,useEffect} from "react";
import {useAuth} from "../store/auth";

export const About=()=>{

const {user} =useAuth();
const [name,setName]=useState("");
const [wel,setWel]=useState("");
const [userData,setUserData]=useState(true);


useEffect(() => {
    if ( user) {
      setName(user.username);
      setWel("Welcome");
    } 
    else if ( !user) { // Clear name on logout
        setName("");
        setWel("");}
  }, [ user]); // Re-run when  `user` changes

    return (
        <>
        <section className="section-hero">
                <div className="container grid grid-two-cols">
                    <div className="hero-content">
                       
                    <p>{`${wel} ${name}`}</p>
                        <h1>Why Choose Us?</h1>
                        <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur excepturi, ut exercitationem architecto dolorem fugit saepe atque, deleniti illum, obcaecati ipsa! Nobis beatae molestiae facilis! Aut enim ex mollitia ducimus eius eligendi, quis nulla ullam quasi. Corrupti illo velit ad dignissimos, blanditiis minus ut nobis dolorem assumenda placeat. Voluptatem rem neque asperiores, deleniti iure aliquid, veniam earum, temporibus nihil maiores dignissimos quos possimus similique voluptatibus? Maiores aliquam, provident iste quaerat reprehenderit voluptatibus dolore esse voluptas earum repudiandae amet omnis. Dolorem nisi, consequatur commodi minus dolore consectetur ipsa quasi velit aut tempora perspiciatis illum amet animi nam ad optio. Animi, aperiam?
                        </p>
                         <div className="btn btn-group">
                            <a href="/contact">
                                <button className="btn">Connect now </button>
                            </a>
                            <a href="/services">
                                <button className="btn secondary-btn">Learn more </button>
                            </a>
                         </div>
                    </div>
                    {/* hero images */}
                    <div className="hero-image">
                        <img src="../public/services.png" alt="Coding together" width="400" 
                          height="400" />
                    </div>

                </div>
              </section>
              <section className="section-analytics">
            <div className="container grid grid-four-cols">
                <div className="div1">
                    <h2>50+</h2>
                    <p>registered companies</p>
                </div>
                <div className="div1">
                    <h2>100,00+</h2>
                    <p>Happy clients</p>
                </div>
                <div className="div1">
                    <h2>500+</h2>
                    <p>Well known Developers</p>
                </div>
                <div className="div1">
                    <h2>24/7</h2>
                    <p>services</p>
                </div>
            </div>
           </section>
        </>
    )
}