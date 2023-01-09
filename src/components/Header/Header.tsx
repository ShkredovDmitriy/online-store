import React from "react";
import "../Style/main.scss";
import  store from "../../assets/Img/iconstore.png";
import  cart from "../../assets/Img/cart.png";
import { useSelector, RootState } from "store";
import { TCartItem } from "types/index";
import { Link } from "react-router-dom";

export const Header = () => {
  
  const cartItems: TCartItem[] = useSelector((state: RootState) => state.cartItems);
  const totalPrice = cartItems.reduce((prev: number, curr: TCartItem) => prev + curr.price * curr.count, 0);
  const discountPrice = cartItems.reduce((prev: number, curr: TCartItem) => 
    prev + Math.round(curr.price * (100 - curr.discountPercentage) / 100) * curr.count, 0);
  const totalCount = cartItems.reduce((prev: number, curr: TCartItem) => prev + curr.count, 0);

  return <header className="header">
    <Link className="header__logo" to={`/`}>
      <img src={store} alt="store" />
      <span className="header__title">Online store</span>
    </Link>
    <div className="header__price">Cart total: 
      <p>{discountPrice}</p>
      { totalPrice !== 0 ? <p className="header__price-total">{totalPrice}</p> : '' }
    </div>
    <Link  className="header__cart" to={`/cart`}>
      <div className="header__cart-count">{totalCount}</div>
      <img src={cart} alt="cart" />
    </Link>

  </header>;
};
