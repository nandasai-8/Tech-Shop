import React from "react";
import { FaShippingFast, FaShieldAlt, FaTags, FaLock } from "react-icons/fa";
import "./Advantages.css";

const Advantages = () => {
    const cards = [
        { icon: <FaShippingFast />, title: "Express Delivery" },
        { icon: <FaShieldAlt />, title: "Brand Warranty" },
        { icon: <FaTags />, title: "Exciting Deals" },
        { icon: <FaLock />, title: "Secure Payments" },
    ];

    return (
        <>
            <div className="content">
                <h1>Advantages</h1>
                <div className="advantages-container">

                    {cards.map((card, index) => (
                        <div key={index} className="advantage-card">
                            <div className="icon">{card.icon}</div>
                            <h3>{card.title}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Advantages;
