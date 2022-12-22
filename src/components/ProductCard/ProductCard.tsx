import React from "react";
import { TProductItem } from "types/index";
import { Link } from "react-router-dom";
import "./productCard.scss";

export const ProductCard = ({ product }: { product: TProductItem }) => {
  const { id, category, title, brand } = product;

  return (
    <div className="product-card">
      <div className="product-card__category">{category}</div>
      <div className="product-card__title">{title}</div>
      <div className="product-card__brand">{brand}</div>
      <Link className="product-card__button-info" to={`/product/${id}`}>
        Details
      </Link>
    </div>
  );
};
