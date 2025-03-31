import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { ShoppingCart, Trash2 } from "lucide-react";

import { addToCart, reduce, remove } from "../features/CartSlice";
import CourseInCart from "../components/CourseInCart";
import ConfirmCheckOut from '../components/ConfirmCheckOut';
import "../styles/Cart.scss";

const Cart = () => {
    const [openCheckoutDialog, setOpenCheckoutDialog] = useState(false);
    const coursercart = useSelector(state => state.cart.arr) || [];
    const sumCourses = useSelector(state => state.cart.sumCourses);
    const finalPrice = useSelector(state => state.cart.finalPrice);
    const disp = useDispatch();


    const handleOpenCheckout = () => {
        setOpenCheckoutDialog(true);
    };
    return (
        <div className="cart-container">
            <h2 className="cart-title">
                <ShoppingCart className="icon" /> shopping cart
            </h2>
            {coursercart.length === 0 ? (
                <p>Your cart is empty</p> 
            ) : (
                <ul className="cart-list">
                    {coursercart.map(item => (
                        <li key={item._id} className="cart-item">
                            <CourseInCart course={item} />
                            <div className="cart-actions">
                                <button className="btn btn-outline" onClick={() => disp(addToCart(item))}>+</button>
                                <button className="btn btn-outline" onClick={() => disp(reduce(item))}>-</button>
                                <button className="btn btn-danger" onClick={() => disp(remove(item))}>
                                    <Trash2 className="icon" />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            {coursercart.length > 0 && (
                <div className="cart-summary">
                    <p>Total amount of courses: <span className="summary-value">{sumCourses}</span></p>
                    <p> Final price: $<span className="summary-price">{finalPrice}</span></p>
                </div>
            )}

            <div className="checkout-section">
                <button
                    className="btn btn-primary checkout-btn"
                    onClick={handleOpenCheckout}
                    disabled={coursercart.length === 0}
                >
                    Proceed to Checkout
                </button>
            </div>
            <ConfirmCheckOut openCheckoutDialog={openCheckoutDialog} setOpenCheckoutDialog={setOpenCheckoutDialog} />

        </div>
    );
};

export default Cart;

