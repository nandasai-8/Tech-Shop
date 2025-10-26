import React from 'react';
import productsData from '../../ProductsData';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Caurosel.css';

const Caurosel = () => {
    const heroProducts = productsData.filter(p => p.heroImage).slice(0, 10);

    return (
        <div
            id="heroCarousel"
            className="carousel slide"
            data-bs-ride="carousel"
            data-bs-interval="1500"
        >
            <div className="carousel-inner">
                {heroProducts.map((product, index) => (
                    <div
                        key={product.id}
                        className={`carousel-item ${index === 0 ? 'active' : ''}`}
                    >
                        <div className="d-flex flex-column flex-md-row align-items-center justify-content-center p-4 carousel-slide-content">

                            {/* IMAGE LEFT */}
                            <Link to={`/products/${product.id}`} className="col-md-6 text-center">
                                <img
                                    src={product.heroImage}
                                    alt={product.title}
                                    className="carousel-img img-fluid"
                                />
                            </Link>

                            {/* CONTENT RIGHT */}
                            <div className="col-md-6 text-center text-md-start mt-3 mt-md-0">
                                <h3 className="title">{product.title}</h3>
                                <p className="tagline">{product.tagline}</p>
                                <p className="info">{product.info}</p>
                                <h5 className="price ">
                                    ₹{product.finalPrice}{' '}
                                    <span className="original-price">₹{product.originalPrice}</span>
                                </h5>
                                <Link to={`/products/${product.id}`} className="btn btn-dark mt-2">
                                    Shop now
                                </Link>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Caurosel;
