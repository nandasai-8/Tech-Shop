import React, { useContext } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../components/context/StoreContext'
import Navbar from '../../components/navbar/Navbar'

const PlaceOrder = () => {
    const { getTotalCartAmount } = useContext(StoreContext)
    return (
        <>
            <Navbar />
            < div className='container'>
                < form className='place-order ' >
                    <div className="place-order-left">
                        <p className="title"> Delivary Information </p>
                        <div className="multi-fields">
                            <input type="text" placeholder='First Name' />
                            <input type="text" placeholder='Last Name' />
                        </div>
                        <input type="email" placeholder='email adress' />
                        <input type="text" placeholder=' street' />
                        <div className="multi-fields">
                            <input type="text" placeholder='city' />
                            <input type="text" placeholder='State' />
                        </div>
                        <div className="multi-fields">
                            <input type="text" placeholder='zip code' />
                            <input type="text" placeholder='country' />
                        </div>
                        <input type="number" placeholder=' phone Number' />
                    </div>
                    <div className="place-order-right">
                        <div className="cart-total">
                            <h2>Cart Totals</h2>
                            <div>
                                <div className="cart-total-details">
                                    <p>Subtotal</p>
                                    <p>₹{getTotalCartAmount()}</p>
                                </div>
                                <hr />
                                <div className="cart-total-details">
                                    <p>Deliver Fee</p>
                                    <p>₹{getTotalCartAmount() == 0 ? 0 : 2}</p>
                                </div>
                                <hr />
                                <div className="cart-total-details">
                                    <b>Total</b>
                                    <b>₹{getTotalCartAmount() == 0 ? 0 : getTotalCartAmount() + 2}</b>
                                </div>
                            </div>
                            <button className='btn btn-outline-primary mt-5 ' >PROCEED TO PAYMENT</button>
                        </div>

                    </div>
                </form >
            </div >
        </>

    )
}

export default PlaceOrder