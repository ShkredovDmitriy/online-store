import React from "react";
import { TProductItem } from "types/index";
import { Link } from "react-router-dom";
import "./productCard.scss";

export const ProductCard = ({ product }: { product: TProductItem }) => {
  const { id, category, title, brand, price, discountPercentage, thumbnail } =
    product;

  return (
    <div className="product-card">
      <img className="product-card__preview" src={thumbnail} alt="Preview" />
      <div className="product-card__category">{category}</div>
      <div className="product-card__title">{title}</div>
      <div className="product-card__brand">{brand}</div>
      <div className="product-card__price">
        {price} / -{discountPercentage}%
      </div>
      <button className="product-card__button-add">Add to cart</button>
      <Link className="product-card__button-info" to={`/product/${id}`}>
        Details
      </Link>
    </div>
  );
};
