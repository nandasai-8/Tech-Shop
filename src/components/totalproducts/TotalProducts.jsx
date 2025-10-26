import React, { useState, useMemo } from "react";
import Navbar from "../navbar/Navbar";
import productsData from "../../ProductsData";
import { Link } from "react-router-dom";
import "./TotalProducts.css";
import Footer from "../footer/Footer";

const TotalProducts = () => {
    const categories = ["All", "Headphones", "Earbuds", "Earphones", "Neckbands"];
    const [selectedCategories, setSelectedCategories] = useState(["All"]);
    const [sortOptions, setSortOptions] = useState([]); // ["low-to-high", "high-to-low"]
    const [priceRange, setPriceRange] = useState(20000); // default max range

    // ✅ Handle category selection (including "All")
    const handleCategoryChange = (category) => {
        if (category === "All") {
            setSelectedCategories(["All"]);
        } else {
            setSelectedCategories((prev) => {
                const withoutAll = prev.filter((c) => c !== "All");
                if (withoutAll.includes(category)) {
                    const updated = withoutAll.filter((c) => c !== category);
                    return updated.length === 0 ? ["All"] : updated;
                } else {
                    return [...withoutAll, category];
                }
            });
        }
    };

    // ✅ Handle sort checkbox toggle
    const handleSortChange = (option) => {
        if (sortOptions.includes(option)) {
            setSortOptions([]);
        } else {
            setSortOptions([option]); // allow only one active
        }
    };

    // ✅ Filtering + sorting logic
    const filteredProducts = useMemo(() => {
        let filtered = productsData;

        // Category filter
        if (!selectedCategories.includes("All")) {
            filtered = filtered.filter((p) => selectedCategories.includes(p.category));
        }

        // Price filter
        filtered = filtered.filter((p) => p.finalPrice <= priceRange);

        // Sorting
        if (sortOptions.includes("low-to-high")) {
            filtered = [...filtered].sort((a, b) => a.finalPrice - b.finalPrice);
        } else if (sortOptions.includes("high-to-low")) {
            filtered = [...filtered].sort((a, b) => b.finalPrice - a.finalPrice);
        }

        return filtered;
    }, [selectedCategories, sortOptions, priceRange]);

    return (
        <>
            <Navbar />

            <div className="total-products-page">
                {/* 🧭 Sidebar */}
                <aside className="sidebar">
                    <h3>Filter by Category</h3>
                    <div className="filter-categories">
                        {categories.map((cat) => (
                            <label key={cat} className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.includes(cat)}
                                    onChange={() => handleCategoryChange(cat)}
                                />
                                {cat}
                            </label>
                        ))}
                    </div>

                    <h3>Sort by Price</h3>
                    <div className="filter-sort">
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={sortOptions.includes("low-to-high")}
                                onChange={() => handleSortChange("low-to-high")}
                            />
                            Low to High
                        </label>
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={sortOptions.includes("high-to-low")}
                                onChange={() => handleSortChange("high-to-low")}
                            />
                            High to Low
                        </label>
                    </div>

                    <h3>Price Range</h3>
                    <input
                        type="range"
                        min="0"
                        max="20000"
                        step="500"
                        value={priceRange}
                        onChange={(e) => setPriceRange(Number(e.target.value))}
                    />
                    <p>Up to ₹{priceRange}</p>
                </aside>

                {/* 🛍️ Products grid */}
                <div className="total-products-content">
                    <h2>All Products ({filteredProducts.length})</h2>

                    <div className="total-products-grid">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <div className="product-card" key={product.id}>
                                    <Link to={`/products/${product.id}`}>
                                        <div className="product-image">
                                            <img
                                                src={product.heroImage || product.images[0]}
                                                alt={product.title}
                                            />
                                        </div>
                                        <div className="product-details">
                                            <h4>{product.title}</h4>
                                            <p className="info">{product.info}</p>
                                            <div className="price-container">
                                                {product.originalPrice && product.originalPrice !== product.finalPrice && (
                                                    <span className="original-price">₹{product.originalPrice}</span>
                                                )}
                                                <span className="price">₹{product.finalPrice}</span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>

                            ))
                        ) : (
                            <p className="no-products">No products found.</p>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default TotalProducts;
