import React, { useState, useRef, useEffect, useContext } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaMoon, FaSun } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { FaRegCircleUser } from "react-icons/fa6";
import productsData from '../../ProductsData';
import { StoreContext } from '../context/StoreContext';
import { DarkTheme } from '../Themecontext/DarkTheme.jsx';

const Navbar = () => {
    const [showSearch, setShowSearch] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isSignup, setIsSignup] = useState(false);
    const searchRef = useRef(null);
    const navigate = useNavigate();
    const { cartItems } = useContext(StoreContext);
    const { darkMode, setDarkMode } = useContext(DarkTheme);

    const totalItems = Object.values(cartItems).reduce((acc, qty) => acc + qty, 0);

    // 🔍 Search filter
    useEffect(() => {
        const timeout = setTimeout(() => {
            const term = searchTerm.trim().toLowerCase();
            if (term.length > 0) {
                const matches = productsData.filter(p =>
                    p.title.toLowerCase().includes(term)
                );
                setFilteredProducts(matches);
            } else {
                setFilteredProducts([]);
            }
        }, 200);
        return () => clearTimeout(timeout);
    }, [searchTerm]);

    // Navigate to product details
    const handleSelect = (product) => {
        setSearchTerm('');
        setFilteredProducts([]);
        setShowSearch(false);
        navigate(`/products/${product.id}`);
    };

    // Close search if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSearch(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Auth form handler
    const handleAuthSubmit = (e) => {
        e.preventDefault();
        alert(isSignup ? "Account created successfully!" : "Logged in successfully!");
        const modal = document.getElementById("authModal");
        const modalInstance = window.bootstrap.Modal.getInstance(modal);
        modalInstance.hide();
    };

    const toggleDarkMode = () => setDarkMode(!darkMode);

    return (
        <>
            <div className={`navbar-container ${darkMode ? 'dark' : 'light'}`}>
                <div className="logo">
                    <Link to="/">Tech-Shop</Link>
                </div>

                {/* SEARCH BOX */}
                <div ref={searchRef} className={`search-box ${showSearch ? 'active' : ''}`}>
                    {showSearch && (
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setShowSearch(true);
                            }}
                            autoFocus
                        />
                    )}

                    {showSearch && filteredProducts.length > 0 && (
                        <ul className="search-dropdown">
                            {filteredProducts.map(product => (
                                <li key={product.id} onClick={() => handleSelect(product)}>
                                    <img
                                        src={product.images?.[0]}
                                        alt={product.title}
                                        className="search-thumb"
                                    />
                                    <div className="search-info">
                                        <span className="search-title">{product.title}</span>
                                        {product.finalPrice && (
                                            <span className="search-price">₹{product.finalPrice}</span>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}

                    {showSearch && searchTerm && filteredProducts.length === 0 && (
                        <ul className="search-dropdown">
                            <li className="search-item not-found">No products found</li>
                        </ul>
                    )}
                </div>

                {/* ICONS */}
                <ul className="nav-icons">
                    <li
                        onClick={() => {
                            setShowSearch(prev => !prev);
                            setSearchTerm('');
                            setFilteredProducts([]);
                        }}
                    >
                        <FaSearch />
                    </li>
                    <li onClick={toggleDarkMode}>
                        {darkMode ? <FaSun /> : <FaMoon />}
                    </li>
                    <li className="cart-icon">
                        <Link to="/cart">
                            <TiShoppingCart size={25} />
                            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
                        </Link>
                    </li>
                    <li data-bs-toggle="modal" data-bs-target="#authModal" data-bs-toggle="tooltip" data-bs-placement="top"
                        data-bs-custom-class="custom-tooltip"
                        data-bs-title="signin / signup">
                        <FaRegCircleUser />
                    </li>
                </ul>
            </div>

            {/* LOGIN / SIGNUP MODAL */}
            <div
                className="modal fade"
                id="authModal"
                tabIndex="-1"
                aria-labelledby="authModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="authModalLabel">
                                {isSignup ? "Sign Up" : "Login"}
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleAuthSubmit}>
                                {isSignup && (
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter your name"
                                            required
                                        />
                                    </div>
                                )}
                                <div className="mb-3">
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Enter your password"
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">
                                    {isSignup ? "Sign Up" : "Login"}
                                </button>
                            </form>
                            <p className="text-center mt-3">
                                {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
                                <button
                                    className="btn btn-link p-0"
                                    type="button"
                                    onClick={() => setIsSignup(!isSignup)}
                                >
                                    {isSignup ? "Login" : "Sign Up"}
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
