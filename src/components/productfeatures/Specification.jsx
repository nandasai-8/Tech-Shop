import React from 'react';
import reviewsData from '../../ProductReviews';
import useActive from '../../useActive.js';
import './Specification.css';

const Specification = ({ brand, title, info, category, type, connectivity }) => {
    const { active, handleActive, activeClass } = useActive('specs');

    return (
        <section id="product_summary" className="section">
            <div className="container">

                {/* ===== Product Summary Tabs ===== */}
                <div className="prod_summary_tabs">
                    <ul className="tabs">
                        <li
                            className={`tabs_item ${activeClass('specs')}`}
                            onClick={() => handleActive('specs')}
                        >
                            Specifications
                        </li>
                        <li
                            className={`tabs_item ${activeClass('overview')}`}
                            onClick={() => handleActive('overview')}
                        >
                            Overview
                        </li>
                        <li
                            className={`tabs_item ${activeClass('reviews')}`}
                            onClick={() => handleActive('reviews')}
                        >
                            Reviews
                        </li>
                    </ul>
                </div>

                {/* ===== Product Summary Details ===== */}
                <div className="prod_summary_details">
                    {active === 'specs' && (
                        <div className="prod_specs">
                            <ul>
                                <li>
                                    <span>Brand</span>
                                    <span>{brand || 'N/A'}</span>
                                </li>
                                <li>
                                    <span>Model</span>
                                    <span>{title || 'N/A'}</span>
                                </li>
                                <li>
                                    <span>Generic Name</span>
                                    <span>{category || 'N/A'}</span>
                                </li>
                                <li>
                                    <span>Headphone Type</span>
                                    <span>{type || 'N/A'}</span>
                                </li>
                                <li>
                                    <span>Connectivity</span>
                                    <span>{connectivity || 'N/A'}</span>
                                </li>
                                <li>
                                    <span>Microphone</span>
                                    <span>Yes</span>
                                </li>
                            </ul>
                        </div>
                    )}

                    {active === 'overview' && (
                        <div className="prod_overview">
                            <h3>
                                The <span>{title}</span> {info} provides fabulous sound quality
                            </h3>
                            <ul>
                                <li>Sound Tuned to Perfection</li>
                                <li>Comfortable to Wear</li>
                                <li>Long Hours Playback Time</li>
                            </ul>
                            <p>
                                Buy the <b>{title} {info}</b> which offers a fabulous music experience with awesome sound quality.
                                Enjoy perfect flexibility and mobility with these {category}, giving you a truly immersive audio experience.
                            </p>
                        </div>
                    )}

                    {active === 'reviews' && (
                        <div className="prod_reviews">
                            <h3>Customer Reviews</h3>
                            <ul>
                                {reviewsData.map(item => (
                                    <li key={item.id} className="review_card">
                                        <div className="review_header">
                                            <strong>{item.name}</strong> — ⭐ {item.rating}/5
                                        </div>
                                        <p className="review_text">{item.review}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Specification;
