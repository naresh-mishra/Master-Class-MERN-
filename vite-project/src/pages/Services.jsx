import { useAuth } from "../store/auth";
import React from "react";
export const Services = () => {
    const { services } = useAuth();
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    
    const checkOutHandler=async(price)=>{
       
        //fetching out razorpaykey from backend ->env file
        const key = await fetch(`${API_BASE_URL}/api/payment/keyid`, {
            method: "GET",
            headers: {
            }
        });
        const KEY=await key.json();
        console.log(KEY);

        const response = await fetch(`${API_BASE_URL}/api/payment/checkout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({price})
        });
        const data=await response.json();
        console.log(data);

        const options={
                key: KEY.key, 
                amount: data.order.amount, 
                currency: 'INR',
                name: 'MishraJi',
                description: 'Transaction for MasterClass',
                image:'https://avatars.githubusercontent.com/u/25058652?v=4',
                order_id: data.order.id, 
                callback_url: `${API_BASE_URL}/api/payment/verification`,
                prefill: {
                  name: 'Gaurav Kumar',
                  email: 'gaurav.kumar@example.com',
                  contact: '9999999999'
                },
                notes:{
                  "address":'Razorpay Corporate Office'
                },
                theme: {
                  "color": '#121212'
                }
              };
        
              const rzp = new window.Razorpay(options);
              rzp.open();
    }


    return (
        <>
            <section className="section-services">
                <div className="container">
                    <h1 className="main-heading">Services</h1>
                </div>
                <div className="container grid grid-three-cols">
                    {
                        services.map((curElement, index) => {
                            const { price, description, provider, service } = curElement;
                            //upper code destructure if not then we have to write curElement.price below
                            return (
                                <div className="card" key={index}>
                                    <div className="card-img">
                                        <img src="../public/services.png" alt="our services info" width="200" />
                                    </div>
                                    <div className="card-details">
                                        <div className="grid grid-two-cols">
                                            <p>{provider}</p>
                                            <p>₹{price}</p>
                                        </div>
                                        <h2 className="service">{service}</h2>
                                        <p>{description}</p>
                                        <button onClick={()=>checkOutHandler(price)}>BUY</button>
                                    </div>
                                </div> 
                        );
                    })
                    }
                </div>
            </section>
        </>
    );
}