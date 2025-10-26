import React, { useEffect, useState, useContext } from 'react';
import Navbar from '../navbar/Navbar';
import { useParams, useNavigate } from 'react-router-dom';
import productsData from '../../ProductsData';
import './ProductDetails.css';
import { StoreContext } from '../context/StoreContext';
import { FaArrowRight, FaStar, FaRegStar } from 'react-icons/fa';
import Advantages from '../Advantages/Advantages';
import Footer from '../footer/Footer';
import Specification from '../productfeatures/Specification';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useContext(StoreContext);
    const [product, setProduct] = useState(null);
    const [mainImage, setMainImage] = useState('');
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [addedProduct, setAddedProduct] = useState(null);

    const handleAddToCart = (id) => {
        addToCart(id);
        setAddedProduct(id);
        setTimeout(() => setAddedProduct(null), 1500);
    };

    useEffect(() => {
        const foundProduct = productsData.find((item) => item.id === parseInt(id));
        if (foundProduct) {
            setProduct(foundProduct);
            setMainImage(foundProduct.images[0]);

            // Related products by category
            const related = productsData.filter(
                (p) => p.category === foundProduct.category && p.id !== foundProduct.id
            );
            setRelatedProducts(related);
        }
    }, [id]);

    if (!product) {
        return (
            <>
                <Navbar />
                <div className="container">
                    <h2>Product not found</h2>
                    <button onClick={() => navigate(-1)}>Go Back</button>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="product-container">
                {/* LEFT: IMAGES */}
                <div className="image-gallery">
                    <div className="side-images">
                        {product.images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`Thumbnail ${index + 1}`}
                                className={`thumbnail ${mainImage === img ? 'selected' : ''}`}
                                onClick={() => setMainImage(img)}
                            />
                        ))}
                    </div>
                    <div className="main-image">
                        <img src={mainImage} alt="Main" />
                    </div>
                </div>

                {/* RIGHT: PRODUCT INFO */}
                <div className="product-info">
                    <h2>{product.title}</h2>
                    <h5>{product.tagline}</h5>
                    <h6>⭐⭐⭐⭐⭐|{product.ratings} ratings</h6>
                    <hr style={{ width: "20rem" }} />

                    <p style={{ color: "orangered", marginTop: "-20px" }}> you save: ₹{product.originalPrice - product.finalPrice}</p>

                    <h6 style={{ marginTop: "-30px" }}>[inclusive all taxes]</h6>
                    <hr style={{ width: "20rem" }} />

                    <div className="offers">
                        <div className="offer">No cost EMI for credit card</div>
                        <div className="discount">pay later & Avail  Cashback</div>
                    </div>
                    <div className="buttons">
                        <button
                            className={`btn-add w-25 ${addedProduct === product.id ? "added" : ""}`}
                            onClick={() => handleAddToCart(product.id)}
                        >
                            {addedProduct === product.id ? "Added!" : "Add To Cart"}
                        </button>
                        <button className="btn-add w-25" onClick={() => navigate("/cart")}>Buy Now</button>
                    </div>
                </div>
            </div>

            <Specification brand={product.brand}
                title={product.title}
                info={product.info}
                category={product.category}
                type={product.type}
                connectivity={product.connectivity} />

            {/* RELATED PRODUCTS */}
            {
                relatedProducts.length > 0 && (
                    <div className="related-products">
                        <h3 style={{ fontSize: '30px', color: "orangered" }}>Related Products in this Category</h3>
                        <div className="related-grid">
                            {relatedProducts.map((p) => (
                                <div
                                    key={p.id}
                                    className="related-card"
                                    onClick={() => navigate(`/products/${p.id}`)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <img src={p.images[0]} alt={p.title} width={200} />
                                    <div className="rating">
                                        {[...Array(5)].map((_, idx) =>
                                            idx < (p.rating || 4) ? (
                                                <FaStar key={idx} color="#f5b50a" />
                                            ) : (
                                                <FaRegStar key={idx} color="#ccc" />
                                            )
                                        )}
                                    </div>
                                    <h4>{p.title}</h4>
                                    <p className="product-info">{p.info}</p>
                                    <hr />

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: '50px' }}>
                                        {p.finalPrice && <h2>₹{p.finalPrice}</h2>}
                                        {p.originalPrice && (
                                            <p style={{ textDecoration: 'line-through', color: 'gray' }}>
                                                ₹{p.originalPrice}
                                            </p>
                                        )}


                                    </div>

                                    <button
                                        className={`btn-add  w-100 ${addedProduct === p.id ? "added" : ""}`}
                                        onClick={(e) => { e.stopPropagation(); addToCart(p.id); setAddedProduct(p.id); }}
                                    > Add To Cart
                                    </button>
                                </div>
                            ))}

                            {/* See All Products */}
                            <div
                                className="related-card see-all-card"
                                onClick={() => navigate('/totalProducts')}
                                style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}
                            >
                                <h4>See All Products</h4>
                                <FaArrowRight size={20} />
                            </div>
                        </div>
                    </div>
                )
            }
            <Advantages />
            <Footer />
        </>
    );
};

export default ProductDetails;
