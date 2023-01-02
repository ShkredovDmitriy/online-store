import React from "react";
import { TProductItem } from "types/index";
import { Link } from "react-router-dom";
import "../Style/main.scss";

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
      <button className="product-card__button-add">Add to cart</button>
      <Link className="product-card__button-info" to={`/product/${id}`}>
        Details
      </Link>
    </div>
  );
};
