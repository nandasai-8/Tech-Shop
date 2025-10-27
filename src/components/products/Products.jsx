import React, { useContext, useState } from "react";
import productsData from "../../ProductsData";
import "./Products.css";
import { FaArrowRight, FaStar, FaRegStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { ToastContainer } from "react-toastify";

const Products = () => {
    const categories = ["All", "Headphones", "Earbuds", "Earphones", "Neckbands"];
    const [selectedCategory, setSelectedCategory] = useState("All");
    const { addToCart } = useContext(StoreContext);
    const [addedProduct, setAddedProduct] = useState(null);

    // Filter products (max 11 items)
    const filteredProducts =
        selectedCategory === "All"
            ? productsData.slice(0, 11)
            : productsData
                .filter((product) => product.category === selectedCategory)
                .slice(0, 11);

    const handleAddToCart = (id) => {
        addToCart(id);
        setAddedProduct(id);
        setTimeout(() => setAddedProduct(null), 1500);
    };

    return (
        <div className="products-section">
            <h2 style={{ textAlign: "center", margin: "3rem 0" }}>Top Products</h2>

            {/* Category Navigation */}
            <div className="category-nav">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        className={selectedCategory === cat ? "active" : ""}
                        onClick={() => setSelectedCategory(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Product Grid */}
            <div className="products-grid">
                {filteredProducts.map((product) => (
                    <div className="product-card" key={product.id}>
                        <Link to={`/products/${product.id}`} className="product-link">
                            <img
                                src={product.heroImage || product.images[0]}
                                alt={product.title}
                            />

                        </Link>

                        {/* Rating from productsData */}
                        <div className="rating">
                            {[...Array(5)].map((_, idx) =>
                                idx < (product.ratings || 4) ? (
                                    <FaStar key={idx} color="#f5b50a" />
                                ) : (
                                    <FaRegStar key={idx} color="#ccc" />
                                )
                            )}| {product.ratings}
                        </div>
                        <h4>{product.title}</h4>
                        <p className="product-info">{product.info}</p>
                        <hr />

                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: '50px' }}>
                            {product.finalPrice && <h2 style={{ color: "orangered" }}>₹{product.finalPrice}</h2>}
                            {product.originalPrice && (
                                <p style={{ textDecoration: 'line-through', color: 'gray' }}>
                                    ₹{product.originalPrice}
                                </p>
                            )}


                        </div>

                        <button
                            className={`btn-add  w-100 ${addedProduct === product.id ? "added" : ""}`}
                            onClick={() => handleAddToCart(product.id)}
                        >
                            {addedProduct === product.id ? "Added!" : "Add To Cart"}
                        </button>
                    </div>
                ))}

                {/* See All Products */}
                <Link to="/totalProducts" className="see-all-link">
                    <div className="product-card see-all-card h-100">
                        <h4>See All Products</h4>
                        <FaArrowRight size={20} />
                    </div>
                </Link>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Products;
