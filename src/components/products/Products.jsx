import React, { useContext, useState } from "react";
import productsData from "../../ProductsData";
import "./Products.css";
import { FaArrowRight, FaStar, FaRegStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";

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
                                idx < (product.rating || 4) ? (
                                    <FaStar key={idx} color="#f5b50a" />
                                ) : (
                                    <FaRegStar key={idx} color="#ccc" />
                                )
                            )}
                        </div>
                        <h4>{product.title}</h4>
                        <p className="product-info">{product.info}</p>
                        <hr />

                        {product.originalPrice && product.originalPrice > product.finalPrice ? (
                            <div className="price">
                                <span className="final-price">₹{product.finalPrice}</span>
                                <span className="original-price">₹{product.originalPrice}</span>
                            </div>
                        ) : (
                            <span className="price">₹{product.finalPrice}</span>
                        )}

                        <button
                            className={`btn-add ${addedProduct === product.id ? "added" : ""}`}
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
        </div>
    );
};

export default Products;
