import React, { useState } from "react";
import { TCartItem, TProductItem } from "types/index";
import { Link } from "react-router-dom";
import "../Style/main.scss";
import { action, useSelector, RootState } from "store";
import { useDispatch } from "react-redux";

export const ProductCard = ({ product }: { product: TProductItem }) => {
  const {
    id,
    //category,
    title,
    //brand,
    //price,
    //rating,
    //stock,
    //discountPercentage,
    thumbnail,
    rating,
  } = product;


  const cartItems: TCartItem[] = useSelector((state: RootState) => state.cartItems);
  const dispatch = useDispatch();

  const isProductInCart = cartItems.find(x => x.id == product.id) !== undefined;

  const addOrRemoveFromCart = () =>{
    if (isProductInCart) {
      dispatch(action.setCartItems([...cartItems].filter(x => x.id != product.id)));
      return;
    }
    dispatch(action.setCartItems([...cartItems, { ...product, count: 1 }]));
  }

  return (
    <div className="product-card">
      <img className="product-card__preview" src={thumbnail} alt="Preview" />
      <h2 className="product-card__title">{title}</h2>
      <h2 className="product-card__rating">{rating}</h2>
      {/* <div className="product-card__info">
        <p>Category: {category}</p>
        <p>Brand: {brand}</p>
        <p>Rating: {rating}</p>
        <p>Stock: {stock}</p>
      </div>
      <div className="product-card__category">{category}</div>
      <div className="product-card__brand">{brand}</div> */}
      <div className="product-card__price">
        <h3>{Math.round(product.price * (100 - product.discountPercentage) / 100)}</h3>
        <h4>{product.price}</h4>
      </div>
      <div className="product-card__button">
        <button className="product-card__button-add" onClick={() => addOrRemoveFromCart()}>
          {isProductInCart ? 'Drop from cart' : 'Add to cart'}
        </button>
        <Link className="product-card__button-info" to={`/product/${id}`}>
          Details
        </Link>
      </div>
    </div>
  );
};
