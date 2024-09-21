import { useAuth } from "../store/auth";
import React from "react";
export const Services = () => {
    const { services } = useAuth();
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
                                            <p>{price}</p>
                                        </div>
                                        <h2 className="service">{service}</h2>
                                        <p>{description}</p>
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