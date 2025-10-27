import React, { useContext } from 'react';
import './Cart.css';
import { useNavigate, Link } from 'react-router-dom';
import { StoreContext } from '../../components/context/StoreContext';
import productsData from '../../ProductsData';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';

const Cart = () => {
    const { cartItems, addToCart, removeFromCart, setCartItems } = useContext(StoreContext);
    const navigate = useNavigate();

    const totalItems = Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);

    let originalTotal = 0;
    let finalTotal = 0;
    let discountTotal = 0;

    productsData.forEach((item) => {
        const quantity = cartItems[item.id] || 0;
        if (quantity > 0) {
            originalTotal += item.originalPrice * quantity;
            finalTotal += item.finalPrice * quantity;
            discountTotal += (item.originalPrice - item.finalPrice) * quantity;
        }
    });

    const removeItemCompletely = (itemId) => {
        const updatedCart = { ...cartItems };
        delete updatedCart[itemId];
        setCartItems(updatedCart);
    };

    return (
        <>
            <Navbar />
            <div className="cart-page">
                {totalItems === 0 ? (
                    <div className="empty-cart-container">
                        <p className="empty-cart-text">Your cart is empty</p>
                        <FaShoppingCart className="empty-cart-icon" />
                        <Link to="/totalProducts" className="browse-items-btn">
                            Browse Items
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="cart-left">
                            <h2>Shopping Cart</h2>
                            {productsData.map((item) => {
                                const quantity = cartItems[item.id] || 0;
                                if (quantity > 0) {
                                    return (
                                        <div className="cart-item" key={item.id}>
                                            {/* Left: Product Image */}
                                            <div className="cart-item-image">
                                                <img src={item.images[0]} alt={item.title} />
                                            </div>

                                            {/* Right: Product Details */}
                                            <div className="cart-item-details">
                                                {/* Delete icon top-right */}
                                                <FaTrash
                                                    className="delete-icon"
                                                    onClick={() => removeItemCompletely(item.id)}
                                                />

                                                <p className="cart-item-title">{item.title}</p>
                                                <p className="cart-item-price">
                                                    Original: ₹{item.originalPrice}
                                                </p>
                                                <p className="cart-item-price">
                                                    Final: ₹{item.finalPrice}
                                                </p>

                                                {/* Quantity Controls */}
                                                <div className="cart-item-quantity-controls">
                                                    <button
                                                        className="qty-btn"
                                                        onClick={() => removeFromCart(item.id)}
                                                        disabled={quantity <= 1}
                                                    >
                                                        −
                                                    </button>
                                                    <span className="cart-item-quantity">{quantity}</span>
                                                    <button
                                                        className="qty-btn"
                                                        onClick={() => addToCart(item.id)}
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                <p className="cart-item-total">
                                                    Subtotal: ₹{item.finalPrice * quantity}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </div>

                        {/* Cart Summary */}
                        <div className="cart-right">
                            <h2>Cart Summary</h2>
                            <div className="cart-summary-details">
                                <p>Total Items: <span>{totalItems}</span></p>
                                <p>Original Price: <span>₹{originalTotal}</span></p>
                                <p>Discount: <span className="discount">- ₹{discountTotal}</span></p>
                                <p><b>Final Price:</b> <span>₹{finalTotal}</span></p>
                                <hr />
                                <p><b>Total Payable:</b> <span>₹{finalTotal}</span></p>
                            </div>

                            <button
                                className="checkout-btn"
                                onClick={() => navigate('/Placeorder')}
                                disabled={totalItems === 0}
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </>
                )}
            </div>
            <Footer />
        </>
    );
};

export default Cart;
