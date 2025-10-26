import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import productsData from "../../ProductsData";
import "./ProductsCaurosel.css";

const ProductsCarousel = () => {
    const visibleCount = 5;
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();
    const totalItems = productsData.length;

    // Autoplay
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % totalItems);
        }, 3000);
        return () => clearInterval(interval);
    }, [totalItems]);

    // Duplicate products for infinite loop
    const extendedProducts = [...productsData, ...productsData, ...productsData];
    const middleOffset = totalItems;

    const translateXOffset = 180;
    const scaleFactor = 0.25;
    const rotateFactor = 30;

    return (
        <div className="products-carousel-container">
            <h2 className="carousel-title ">Featured Products</h2>
            <div className="carousel-wrapper">
                {extendedProducts.map((product, idx) => {
                    const diff = idx - middleOffset - currentIndex;

                    if (Math.abs(diff) > Math.floor(visibleCount / 2)) return null;

                    const scale = 1 - Math.abs(diff) * scaleFactor;
                    const rotateY = diff * -rotateFactor;
                    const translateX = diff * translateXOffset;
                    const zIndex = 10 - Math.abs(diff);
                    const opacity = 1 - Math.abs(diff) * 0.2;

                    return (
                        <div
                            key={`${product.id}-${idx}`}
                            className={`product-card-carousel ${diff === 0 ? "active" : ""}`}
                            onClick={() => diff === 0 && navigate(`/products/${product.id}`)}
                            style={{
                                transform: `
                  perspective(1200px)
                  translateX(${translateX}px)
                  scale(${scale})
                  rotateY(${rotateY}deg)
                  translateZ(${diff === 0 ? 50 : 0}px)
                `,
                                zIndex: zIndex,
                                opacity: opacity,
                            }}
                        >
                            <div className="image-wrapper">
                                <img
                                    src={product.images?.[0] || product.images[0]}
                                    alt={product.title}
                                    className="img-fluid"
                                />
                            </div>
                            <div className="product-info text-center mt-2">
                                <h6 className={`product-title ${diff === 0 ? "active-title" : ""}`}>
                                    {product.title}
                                </h6>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProductsCarousel;
