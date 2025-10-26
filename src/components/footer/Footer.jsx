import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className='footer' id='footer'>
            <div className="footer-content">
                {/* Left Section */}
                <div className="footer-left">
                    <h1>Tech-Shop</h1>
                    <p>Subscribe to our email alerts to receive early discount offers and new product info.</p>
                    <div className="subscribe">
                        <input type="email" placeholder='Enter your email...' />
                        <button className='btn-subscribe'>Subscribe</button>
                    </div>
                </div>

                {/* Company Section */}
                <div className="footer-section">
                    <h2>Company</h2>
                    <ul>
                        <li>About Us</li>
                        <li>Contact Us</li>
                        <li>Service Centers</li>
                        <li>Careers</li>
                        <li>Affiliates</li>
                    </ul>
                </div>

                {/* Help Section */}
                <div className="footer-section">
                    <h2>Help</h2>
                    <ul>
                        <li>FAQs</li>
                        <li>Track Order</li>
                        <li>Cancel Order</li>
                        <li>Return Order</li>
                        <li>Warranty Info</li>
                    </ul>
                </div>

                {/* Policies Section */}
                <div className="footer-section">
                    <h2>Policies</h2>
                    <ul>
                        <li>Return Policy</li>
                        <li>Security</li>
                        <li>Sitemap</li>
                        <li>Privacy Policy</li>
                        <li>Terms & Conditions</li>
                    </ul>
                </div>
            </div>

            <hr />
            <p className="footer-copyright">
                &copy; 2024 Tech-Shop - All Rights Reserved
            </p>
        </footer>
    );
};

export default Footer;
