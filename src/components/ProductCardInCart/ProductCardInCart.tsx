import React, { useState } from "react";
import { TCartItem, TProductItem } from "types/index";
import { useDispatch } from "react-redux";
import { productsList } from "data";
import { useParams } from "react-router-dom";
import { action, useSelector, RootState } from "store";
import { Link } from "react-router-dom";
import { Button } from '../Button/button';
import "../../components/Style/main.scss";


export const ProductCardInCart= ({ item, order, addItem, removeItem }: 
  { item: TCartItem, order: number, addItem: (id: number) => void, removeItem: (id: number) => void }) => {
  const {
    id,
    count,
    title,
    description,
    price,
    discountPercentage,
    rating,
    thumbnail,
    stock,
  } = item;

  return (
    <div className="card-item">
      <p className="card-item__number">{order}</p>
      <a className="card-item__img" href={`/product/${id}`}>
        <img src={thumbnail} alt="Product" />
      </a>
      <div className="card-item__preview">
        <div>
          <a href={`/product/${id}`}><h2 className="card-item__preview-title">{title}</h2></a>
          <h2 className="card-item__preview-rating">{rating}</h2>
        </div>
        <p className="card-item__preview-description">{description}</p>
        <p className="card-item__preview-stock">Stock: {stock}</p>
      </div>
      <div className="card-item__count">
        <div className="card-item__count-control">
          <Button type="switch-btn" backColor="#B4E907" onClick={() => addItem(id)}>+</Button>
          {count}
          <Button type="switch-btn" backColor="#B4E907" onClick={() => removeItem(id)}>-</Button>
        </div>
        <div className="card-item__count-price">
          <h3>{Math.round(price * (100 - discountPercentage) / 100) * count}</h3>
          <h3>{price * count}</h3>
        </div>
      </div>
    </div>
  );
  };